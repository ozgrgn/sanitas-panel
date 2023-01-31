<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import TextEditor2 from "$components/Form/TextEditor2.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Switch from "$components/Switch.svelte";
  import Image from "$components/Form/Image.svelte";
  import { lang } from "$services/store";

  let values = [
    { key: "lang", customValue: null },
    { key: "question", customValue: null },
    { key: "answer", customValue: null },
    { key: "general", customValue: null },
    { key: "order", customValue: null },
    { key: "isActive", customValue: null },
    { key: "treatment", customValue: null },
  ];

  let faq = {};
  let langs = [];
  let treatments=[];
let selectedTreatment;
  
  values.map((v) => {
    if (v.defaultValue) {
      faq[v.key] = { value: v.defaultValue };
    } else {
      faq[v.key] = {};
    }
  });
  const getLang = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
  };
  const getTreatments = async () => {
    let response = await RestService.getTreatments(
      undefined,
      undefined,
      faq.lang.value,
      undefined,
      selectedTreatment
    );
    treatments = response["treatments"];
    console.log(treatments, "treatments");
  };
  getLang();
  const addFaq = async () => {
    if(faq.general.value) {
      faq.treatment.value=undefined
    }
    let data = {};

    values.map((v) => {
      if (faq[v.key].value) {
        data[v.key] = faq[v.key]?.value;
      }
    });
    let response = await RestService.addFaq(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/faqs");
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
        navigate("/panel/faqs");
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
          <h3 class="font-semibold text-lg text-blueGray-700">SSS ekle</h3>

          <div class="mb-3">
            <label
              class="block  text-blueGray-600 text-xs font-bold mb-2"
              for="rectangleBanner"
            >
              Aktif mi ?
            </label>

            <Switch bind:value={faq.isActive.value} />
          </div>
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
                  bind:value={faq.lang.value}
                  bind:isValid={faq.lang.isValid}
                  values={langs}
                  title={"Dil Seçin"}
                  valuesKey={"lang"}
                  valuesTitleKey={"title"}
                  customClass={"w-full"}
                  change={()=>getTreatments()}
                />
              {/if}
            </div>
          </div>
          <div class=" w-full lg:w-3/12 px-4">
          <div class="mb-3 flex flex-col items-center">
            <label
              class="text-blueGray-600 text-xs font-bold mb-2"
              for="rectangleBanner"
            >
              Genel mi ?
            </label>

            <Switch bind:value={faq.general.value} />
          </div>
        </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Tedavi Seç
              </label>
              {#if treatments}
                <Select
                  bind:value={faq.treatment.value}
                  bind:isValid={faq.treatment.isValid}
                  values={treatments}
                  title={"Tedavi Seçin"}
                  valuesKey={"_id"}
                  valuesTitleKey={"title"}
                  customClass={"w-full"}
                  disabled={!faq.lang.value || faq.general.value}
                />
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Sıra
              </label>

              <NumberInput
                bind:value={faq.order.value}
                bind:isValid={faq.order.isValid}
                placeholder={"Sıra"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Soru
              </label>
              <Input
                bind:value={faq.question.value}
                bind:isValid={faq.question.isValid}
                placeholder={"Soru"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Cevap
              </label>

              <Textarea
                bind:value={faq.answer.value}
                bind:isValid={faq.answer.isValid}
                placeholder={"Cevap"}
                required={true}
              />
            </div>
          </div>
         
        </div>
     
        <div class="w-full flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addFaq}
              disabled={!faq.lang.isValid ||
                faq.lang.value == null
                }
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
