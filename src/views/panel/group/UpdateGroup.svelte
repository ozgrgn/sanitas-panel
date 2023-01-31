<script>
  import Alert from "$components/Alert.svelte";
  import Image from "$components/Form/Image.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  const deleteGroupApprove = (groupId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteGroup(groupId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let deleteImage = (index) => {
    group.images.splice(index, 1);
    group.images = group.images;
  };
  let group;
  let langs = [];


  let values = [
    { key: "lang", customValue: null },
    { key: "title", customValue: null },
    { key: "description", customValue: null },
    { key: "description2", customValue: null },
    { key: "department", customValue: null },
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
  const updateGroup = async () => {
    let editedGroup = {};
    editedGroup.images = group.images;
    editedGroup.logos = group.logos;
    values.map((v) => {
      editedGroup[v.key] = group[v.key].value;
    });

    let response = await RestService.updateGroup(group._id, editedGroup);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/groups");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getGroup = async () => {
    let response = await RestService.getGroup($params.groupId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["group"][v.key] = {
            value: response["group"][v.key][v.customValue],
          };
        } else {
          response["group"][v.key] = { value: response["group"][v.key] };
        }
      });
      group = {
        ...response["group"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getGroup();

  const deleteGroup = async (groupId) => {
    let response = await RestService.deleteGroup(groupId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/groups");
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
          navigate("/panel/groups");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteGroupApprove($params.groupId)}
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
            Group güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if group}
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
                  bind:value={group.lang.value}
                  bind:isValid={group.lang.isValid}
                  values={langs}
                  title={"Dil Seçin"}
                  valuesKey={"lang"}
                  valuesTitleKey={"title"}
                  customClass={"w-full"}
                />
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Departman mı ?
              </label>

              <Switch bind:value={group.department.value} />
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
                bind:value={group.title.value}
                bind:isValid={group.title.isValid}
                placeholder={"Tedavi Grubu Başlığı"}
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
                bind:value={group.description.value}
                bind:isValid={group.description.isValid}
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
                bind:value={group.perma.value}
                bind:isValid={group.perma.isValid}
                placeholder={"Yönlenecek sayfa"}
                required={false}
              />
            </div>
          </div>
        </div>
        {#if group.department.value}
          <div class="flex flex-wrap my-4">
            <div class="w-full  px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Biraz Uzun Açıklama
                </label>
                <Input
                  bind:value={group.description2.value}
                  bind:isValid={group.description2.isValid}
                  placeholder={"Biraz Uzun Açıklama"}
                  required={true}
                />
              </div>
            </div>  
          </div>
        {/if}
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
                  bind:value={group.svg.value}
                  bind:isValid={group.svg.isValid}
                  placeholder={"SVG Kodu"}
                  required={true}
                />
              </div>
            </div>
            {#if group.department.value}
            <div class="w-full lg:w-6/12 px-4">
              <div class=" relative w-full h-40 mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="backgroundBanner"
                >
                  Resim (405 × 225 px)
                </label>
                <div class="flex h-full border flex-col justify-center my-2">
                  <Image
                    bind:value={group.image.value}
                    bind:isValid={group.image.isValid}
                  />
                </div>
              </div>
            </div>
            {/if}
          </div>
          {#if group.department.value}
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
                  placeholder={"Text"}
                  bind:value={group.text.value}
                />
              </div>
            </div>
          </div>
        {/if}
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateGroup()}
                disabled={!group.lang.isValid }
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
