<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import { modal } from "$services/store";
  import TextEditor from "$components/Form/TextEditor.svelte";

  let values = [
    { key: "lang", customValue: null },
    { key: "about_title", customValue: null },
    { key: "about_left", customValue: null },
    { key: "about_right", customValue: null },
    
    { key: "images", customValue: null },
  ];

  let about = {};
  let langs = [];
  let images = [];
  let deleteImage = (index) => {
    images.splice(index, 1);
    images = images;
  };
  let logos = [];
  let deleteLogo = (index) => {
    logos.splice(index, 1);
    logos = logos;
  };
  const getLangs = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
  };
  getLangs();
  values.map((v) => {
    if (v.defaultValue) {
      about[v.key] = { value: v.defaultValue };
    } else {
      about[v.key] = {};
    }
  });

  const addAbout = async () => {
    let data = {};
    data.images = images;
    data.logos = logos;
    values.map((v) => {
      if (about[v.key].value) {
        data[v.key] = about[v.key]?.value;
      }
    });
    let response = await RestService.addAbout(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/abouts");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
      type="button"
      on:click={() => {
        navigate("/panel/abouts");
      }}
    >
      <i class="fa fa-arrow-left" />
      {$Translate("Back")}
    </button>
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
          <h3 class="font-semibold text-lg text-blueGray-700">
            Hakkımızda ekle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Dil
              </label>
              <Select
                bind:value={about.lang.value}
                bind:isValid={about.lang.isValid}
                values={langs}
                title={"Dil Seçin"}
                valuesKey={"lang"}
                valuesTitleKey={"title"}
                customClass={"w-full"}
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
                Başlık
              </label>
              <Input
                bind:value={about.about_title.value}
                bind:isValid={about.about_title.isValid}
                placeholder={"Hakkımızda Başlık"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Kısa Açıklama
              </label>

              <Textarea
                placeholder={"Kısa Açıklama Yukarısı İçin"}
                bind:value={about.about_left.value}
              />
            </div>
          </div>
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Uzun Açıklama
              </label>
              <TextEditor
                placeholder={"Uzun Açıklama Sayfanın Altı İçin"}
                bind:value={about.about_right.value}
              />
            </div>
          </div>
        </div>
   
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addAbout}
              disabled={!about.lang.isValid || about.lang.value == null}
              class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
              type="button"
            >
              {$Translate("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
