<script>
  import Alert from "$components/Alert.svelte";
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
  const deleteHealthApprove = (healthId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteHealth(healthId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let deleteImage = (index) => {
    health.images.splice(index, 1);
    health.images = health.images;
  };
  let deleteLogo = (index) => {
    health.logos.splice(index, 1);
    health.logos = health.logos;
  };
  let health;
  let langs = [];
  let images = [];

  let values = [
    { key: "lang", customValue: null },
    { key: "health_title", customValue: null },
    { key: "health_left", customValue: null },
    { key: "health_right", customValue: null },
    { key: "health_subTitle1", customValue: null },
    { key: "health_subTitle2", customValue: null },
    { key: "images", customValue: null },
  ];
  const getLang = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLang();
  const updateHealth = async () => {
    let editedHealth = {};
    editedHealth.images = health.images;
    editedHealth.logos = health.logos;
    values.map((v) => {
      editedHealth[v.key] = health[v.key].value;
    });

    let response = await RestService.updateHealth(health._id, editedHealth);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/healths");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getHealth = async () => {
    let response = await RestService.getHealth($params.healthId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["health"][v.key] = {
            value: response["health"][v.key][v.customValue],
          };
        } else {
          response["health"][v.key] = { value: response["health"][v.key] };
        }
      });
      health = {
        ...response["health"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getHealth();

  const deleteHealth = async (healthId) => {
    let response = await RestService.deleteHealth(healthId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/healths");
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
          navigate("/panel/healths");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteHealthApprove($params.healthId)}
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
            Health güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if health}
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
                bind:value={health.lang.value}
                bind:isValid={health.lang.isValid}
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
            <div class="w-full lg:w-12/12">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Başlık
              </label>
              <Input
                bind:value={health.health_title.value}
                bind:isValid={health.health_title.isValid}
                placeholder={"Health Başlık"}
                required={true}
              />
            </div>
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
               Alt Başlık 1
              </label>
              <Input
                bind:value={health.health_subTitle1.value}
                bind:isValid={health.health_subTitle1.isValid}
                placeholder={"Welcome To"}
                required={false}
              />
            </div>
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
               Alt Başlık 2
              </label>
              <Input
                bind:value={health.health_subTitle2.value}
                bind:isValid={health.health_subTitle2.isValid}
                placeholder={"Sanitas Health Travel"}
                required={false}
              />
            </div>
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
                bind:value={health.health_left.value}
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
                bind:value={health.health_right.value}
                bind:incomingValue={health.health_right.value}

              />
            </div>
          </div>
        </div>
      
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={() => updateHealth()}
                disabled={!health.lang.isValid }
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
