<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";

  let values = [
    { key: "lang", customValue: null },
    { key: "homePage", customValue: null },
    { key: "about", customValue: null },
    { key: "treatments", customValue: null },
    { key: "contact", customValue: null },
    { key: "language", customValue: null },
    { key: "allTreatments", customValue: null },
    { key: "book_an_appointment", customValue: null },
    { key: "name", customValue: null },
    { key: "phone", customValue: null },
    { key: "mail", customValue: null },
    { key: "send", customValue: null },
    { key: "phone_required", customValue: null },
    { key: "name_required", customValue: null },
    { key: "email_required", customValue: null },
    { key: "address", customValue: null },
    { key: "note", customValue: null },
    { key: "subject", customValue: null },
    { key: "faq", customValue: null },
    { key: "faq1", customValue: null },
    { key: "faq2", customValue: null },
    { key: "review1", customValue: null },
    { key: "review2", customValue: null },
    { key: "group1", customValue: null },
    { key: "group2", customValue: null },
    { key: "about1", customValue: null },
    { key: "about2", customValue: null },
    { key: "form_header1", customValue: null },
    { key: "form_header2", customValue: null },
    { key: "form_button", customValue: null },
    { key: "form_sent", customValue: null },
    { key: "read_more", customValue: null },
    { key: "posted_on", customValue: null },



  ];

  let translate = {};
  let langs = [];

  values.map((v) => {
    if (v.defaultValue) {
      translate[v.key] = { value: v.defaultValue };
    } else {
      translate[v.key] = {};
    }
  });
  const getLang = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLang();

  const addTranslate = async () => {
    let data = {};
    values.map((v) => {
      data[v.key] = translate[v.key]?.value;
    });
    let response = await RestService.addTranslate(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/translates");
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
        navigate("/panel/translates");
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
          <h3 class="font-semibold text-lg text-blueGray-700">Anasayfa ekle</h3>
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
                bind:value={translate.lang.value}
                bind:isValid={translate.lang.isValid}
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
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                AnaSayfa
              </label>
              <Input
                bind:value={translate.homePage.value}
                bind:isValid={translate.homePage.isValid}
                placeholder={"HomePage"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Hakkımızda
              </label>
              <Input
                bind:value={translate.about.value}
                bind:isValid={translate.about.isValid}
                placeholder={"About"}
                required={true}
              />
            </div>
          </div>

          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Tedaviler
              </label>
              <Input
                bind:value={translate.treatments.value}
                bind:isValid={translate.treatments.isValid}
                placeholder={"Treatments"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                İletişim
              </label>
              <Input
                bind:value={translate.contact.value}
                bind:isValid={translate.contact.isValid}
                placeholder={"Contact"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                SSS
              </label>
              <Input
                bind:value={translate.faq.value}
                bind:isValid={translate.faq.isValid}
                placeholder={"SSS"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                SSS Başlık 1
              </label>
              <Input
                bind:value={translate.faq1.value}
                bind:isValid={translate.faq1.isValid}
                placeholder={"SSS Başlık 1"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                SSS Başlık 2
              </label>
              <Input
                bind:value={translate.faq2.value}
                bind:isValid={translate.faq2.isValid}
                placeholder={"SSS Başlık 2"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Yorumlar Başlık 1
              </label>
              <Input
                bind:value={translate.review1.value}
                bind:isValid={translate.review1.isValid}
                placeholder={"Yorumlar Başlık 1"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
              Yorumlar Başlık 2
              </label>
              <Input
                bind:value={translate.review2.value}
                bind:isValid={translate.review2.isValid}
                placeholder={"Yorumlar Başlık 2"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Tedavi Grupları Başlık 1
              </label>
              <Input
                bind:value={translate.group1.value}
                bind:isValid={translate.group1.isValid}
                placeholder={"Tedavi Grupları Başlık 1"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Tedavi Grupları Başlık 2
              </label>
              <Input
                bind:value={translate.group2.value}
                bind:isValid={translate.group2.isValid}
                placeholder={"Tedavi Grupları Başlık 2"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Hakkımızda Başlık 1
              </label>
              <Input
                bind:value={translate.about1.value}
                bind:isValid={translate.about2.isValid}
                placeholder={"Hakkımızda Başlık 1"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
              Hakkımızda Başlık 2
              </label>
              <Input
                bind:value={translate.about2.value}
                bind:isValid={translate.about2.isValid}
                placeholder={"Hakkımızda Başlık 2"}
                required={true}
              />
            </div>
          </div>
          
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Dil
              </label>
              <Input
                bind:value={translate.language.value}
                bind:isValid={translate.language.isValid}
                placeholder={"Language"}
                required={true}
              />
            </div>
          </div>

          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Tüm Tedaviler
              </label>
              <Input
                bind:value={translate.allTreatments.value}
                bind:isValid={translate.allTreatments.isValid}
                placeholder={"All Treatments"}
                required={true}
              />
            </div>
          </div>

          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                From Başlık 1
              </label>
              <Input
                bind:value={translate.form_header1.value}
                bind:isValid={translate.form_header1.isValid}
                placeholder={"From Başlık 1"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                From Başlık 2
              </label>
              <Input
                bind:value={translate.form_header2.value}
                bind:isValid={translate.form_header2.isValid}
                placeholder={"From Başlık 2"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                From Button
              </label>
              <Input
                bind:value={translate.form_button.value}
                bind:isValid={translate.form_button.isValid}
                placeholder={"From Button"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                From Gönderildi Mesajı
              </label>
              <Input
                bind:value={translate.form_sent.value}
                bind:isValid={translate.form_sent.isValid}
                placeholder={"From Button"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                İsim
              </label>
              <Input
                bind:value={translate.name.value}
                bind:isValid={translate.name.isValid}
                placeholder={"Name"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Telefon
              </label>
              <Input
                bind:value={translate.phone.value}
                bind:isValid={translate.phone.isValid}
                placeholder={"Phone"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                E-Mail
              </label>
              <Input
                bind:value={translate.mail.value}
                bind:isValid={translate.mail.isValid}
                placeholder={"E-mail"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Konu
              </label>
              <Input
                bind:value={translate.subject.value}
                bind:isValid={translate.subject.isValid}
                placeholder={"Konu"}
                required={false}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Gönder
              </label>
              <Input
                bind:value={translate.send.value}
                bind:isValid={translate.send.isValid}
                placeholder={"Send"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                İsim Gerekli
              </label>
              <Input
                bind:value={translate.name_required.value}
                bind:isValid={translate.name_required.isValid}
                placeholder={"Name required"}
                required={true}
              />
            </div>
          </div>

          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Telefon Gerekli
              </label>
              <Input
                bind:value={translate.phone_required.value}
                bind:isValid={translate.phone_required.isValid}
                placeholder={"Phone required"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                E-mail Gerekli
              </label>
              <Input
                bind:value={translate.email_required.value}
                bind:isValid={translate.email_required.isValid}
                placeholder={"E-mail required"}
                required={true}
              />
            </div>
          </div>

          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Adres
              </label>
              <Input
                bind:value={translate.address.value}
                bind:isValid={translate.address.isValid}
                placeholder={"Address"}
                required={true}
              />
            </div>
          </div>

          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Not
              </label>
              <Input
                bind:value={translate.note.value}
                bind:isValid={translate.note.isValid}
                placeholder={"Note"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Randevu Butonu
              </label>
              <Input
                bind:value={translate.book_an_appointment.value}
                bind:isValid={translate.book_an_appointment.isValid}
                placeholder={"Free Consultation"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Daha Fazla
              </label>
              <Input
                bind:value={translate.read_more.value}
                bind:isValid={translate.read_more.isValid}
                placeholder={"Read More"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Yayınlanan Yer
              </label>
              <Input
                bind:value={translate.posted_on.value}
                bind:isValid={translate.posted_on.isValid}
                placeholder={"Posted on"}
                required={true}
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addTranslate}
              disabled={!translate.lang.isValid || translate.lang.value == null}
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
