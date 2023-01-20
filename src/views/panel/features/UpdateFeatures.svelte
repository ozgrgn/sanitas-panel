<script>
  import Alert from "$components/Alert.svelte";
  import Image from "$components/Form/Image.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  const deleteFeatureApprove = (featureId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteFeature(featureId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let deleteImage = (index) => {
    feature.images.splice(index, 1);
    feature.images = feature.images;
  };
  let deleteLogo = (index) => {
    feature.logos.splice(index, 1);
    feature.logos = feature.logos;
  };
  let feature;
  let langs = [];


  let values = [
    { key: "lang", customValue: null },
    { key: "title", customValue: null },
    { key: "description", customValue: null },
    { key: "svg", customValue: null },
    { key: "perma", customValue: null },
    { key: "text", customValue: null },
    { key: "image", customValue: null },
  ];
  const getLangs = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLangs();
  const updateFeature = async () => {
    let editedFeature = {};
    editedFeature.images = feature.images;
    editedFeature.logos = feature.logos;
    values.map((v) => {
      editedFeature[v.key] = feature[v.key].value;
    });

    let response = await RestService.updateFeature(feature._id, editedFeature);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/features");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getFeature = async () => {
    let response = await RestService.getFeature($params.featureId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["feature"][v.key] = {
            value: response["feature"][v.key][v.customValue],
          };
        } else {
          response["feature"][v.key] = { value: response["feature"][v.key] };
        }
      });
      feature = {
        ...response["feature"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getFeature();

  const deleteFeature = async (featureId) => {
    let response = await RestService.deleteFeature(featureId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/features");
    } else {
      ToastService.success("İşlem başarılı");
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <div class="flex justify-between">
      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => {
          navigate("/panel/features");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteFeatureApprove($params.featureId)}
      >
        <i class="fa fa-trash" />
        Sil
      </button>
    </div>

    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
          <h3 class="font-semibold text-lg text-blueGray-700">
            Feature güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if feature}
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Dil
              </label>
              {#if langs}
              <Select
                bind:value={feature.lang.value}
                bind:isValid={feature.lang.isValid}
                values={langs}
                title={"Dil Seçin"}
                valuesKey={"lang"}
                valuesTitleKey={"title"}
                customClass={"w-full"}
              />
              {/if}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Başlık
              </label>
              <Input
                bind:value={feature.title.value}
                bind:isValid={feature.title.isValid}
                placeholder={"Özellik Başlığı"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-7/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Kısa Açıklama
              </label>
              <Input
                bind:value={feature.description.value}
                bind:isValid={feature.description.isValid}
                placeholder={"Kısa Açıklama"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-2/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Perma (url path)
              </label>
              <Input
                bind:value={feature.perma.value}
                bind:isValid={feature.perma.isValid}
                placeholder={"Yönlenecek sayfa"}
                required={false}
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                SVG Kodu
              </label>
              <Textarea
                bind:value={feature.svg.value}
                bind:isValid={feature.svg.isValid}
                placeholder={"SVG Kodu"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class=" relative w-full h-40 mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="backgroundBanner"
              >
                Sayfa var ise resim
              </label>
              <div class="flex h-full border flex-col justify-center my-2">
                <Image
                  bind:value={feature.image.value}
                  bind:isValid={feature.image.isValid}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Text
              </label>

              <TextEditor
                placeholder={"Test"}
                bind:value={feature.text.value}
                bind:incomingValue={feature.text.value}

              />
            </div>
          </div>
        </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateFeature()}
                disabled={!feature.lang.isValid }
                class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                type="button"
              >
                {$Translate("Update")}
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
