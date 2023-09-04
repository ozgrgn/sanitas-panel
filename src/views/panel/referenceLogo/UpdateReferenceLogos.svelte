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
  const deleteReferenceLogoApprove = (referenceLogoId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteReferenceLogo(referenceLogoId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();


  let referenceLogo;
  let langs = [];


  let values = [
    { key: "lang", customValue: null },
    { key: "name", customValue: null },
    { key: "image", customValue: null },
  ];
  const getLangs = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLangs();
  const updateReferenceLogo = async () => {
    let editedReferenceLogo = {};
    editedReferenceLogo.images = referenceLogo.images;
    editedReferenceLogo.logos = referenceLogo.logos;
    values.map((v) => {
      editedReferenceLogo[v.key] = referenceLogo[v.key].value;
    });

    let response = await RestService.updateReferenceLogo(referenceLogo._id, editedReferenceLogo);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/referenceLogos");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getReferenceLogo = async () => {
    let response = await RestService.getReferenceLogo($params.referenceLogoId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["referenceLogo"][v.key] = {
            value: response["referenceLogo"][v.key][v.customValue],
          };
        } else {
          response["referenceLogo"][v.key] = { value: response["referenceLogo"][v.key] };
        }
      });
      referenceLogo = {
        ...response["referenceLogo"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getReferenceLogo();

  const deleteReferenceLogo = async (referenceLogoId) => {
    let response = await RestService.deleteReferenceLogo(referenceLogoId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/referenceLogos");
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
          navigate("/panel/referenceLogos");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteReferenceLogoApprove($params.referenceLogoId)}
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
            ReferenceLogo güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if referenceLogo}
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Dil
              </label>
              {#if langs}
                <Select
                  bind:value={referenceLogo.lang.value}
                  bind:isValid={referenceLogo.lang.isValid}
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
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                İsim
              </label>
              <Input
                bind:value={referenceLogo.name.value}
                bind:isValid={referenceLogo.name.isValid}
                placeholder={"İsim"}
                required={true}
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap my-4">
    
          <div class="w-full lg:w-6/12 px-4">
            <div class=" relative w-full h-40 mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for="backgroundBanner"
              >
                Resim
              </label>
              <div class="flex h-full border flex-col justify-center my-2">
                <Image
                  bind:value={referenceLogo.image.value}
                  bind:isValid={referenceLogo.image.isValid}
                />
              </div>
            </div>
          </div>
        </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateReferenceLogo()}
                disabled={!referenceLogo.lang.isValid }
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
