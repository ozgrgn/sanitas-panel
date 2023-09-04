<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import Image from "$components/Form/Image.svelte";

  let values = [
    { key: "lang", customValue: null },
    { key: "title", customValue: null },
    { key: "description", customValue: null },
    { key: "svg", customValue: null },
    { key: "perma", customValue: null },
    { key: "text", customValue: null },
    { key: "image", customValue: null },
  ];

  let step = {};


  values.map((v) => {
    if (v.defaultValue) {
      step[v.key] = { value: v.defaultValue };
    } else {
      step[v.key] = {};
    }
  });
  let langs;
  const getLangs = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLangs();

  const addStep = async () => {
    let data = {};
    values.map((v) => {
      if (step[v.key].value) {
        data[v.key] = step[v.key]?.value;
      }
    });
    let response = await RestService.addStep(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/steps");
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
        navigate("/panel/steps");
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
          <h3 class="font-semibold text-lg text-blueGray-700">Adım ekle</h3>
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
              {#if langs}
              <Select
                bind:value={step.lang.value}
                bind:isValid={step.lang.isValid}
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
                bind:value={step.title.value}
                bind:isValid={step.title.isValid}
                placeholder={"Adım Başlığı"}
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
                bind:value={step.description.value}
                bind:isValid={step.description.isValid}
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
                bind:value={step.perma.value}
                bind:isValid={step.perma.isValid}
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
                bind:value={step.svg.value}
                bind:isValid={step.svg.isValid}
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
                Sayfası var ise resim
              </label>
              <div class="flex h-full border flex-col justify-center my-2">
                <Image
                  bind:value={step.image.value}
                  bind:isValid={step.image.isValid}
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
               Sayfası var ise text
              </label>

              <TextEditor
                placeholder={"Text"}
                bind:value={step.text.value}

              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addStep}
              disabled={!step.lang.isValid || step.lang.value == null}
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
