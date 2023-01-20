<!-- App.svelte -->
<script>
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { Route, Router, navigate } from "svelte-navigator";
  import AdminRoute from "./views/panel/Route.svelte";
  import Auth from "./views/auth/Auth.svelte";
  import { onDestroy } from "svelte";
  import RestService from "./services/rest";
  import { isDesktop } from "$services/utils";
  import { user } from "$services/store";

  if (
    window.location.pathname == "/auth/login" ||
    window.location.pathname == "/panel" ||
    window.location.pathname == "/panel/" ||
    window.location.pathname.includes("panel")
  ) {
    let userAuthSubscription = user.subscribe(async (auth) => {
      if (!auth) {
        navigate("/auth/login");

        if (window.location.pathname.indexOf("admin") != -1) {
          navigate("/auth/login");
        }
      } else {
        let response = await RestService.verifyToken();
        if (response && response.status) {
          if (
            window.location.pathname == "/auth/login" ||
            window.location.pathname == "/panel" ||
            window.location.pathname == "/" ||
            window.location.pathname == "/panel/"
          ) {
            navigate("/panel/dashboard");
          }
        } else {
          user.set(null);
        }
      }
    });
    onDestroy(() => {
      userAuthSubscription;
    });
  }

</script>


<SvelteToast />

<Router primary={false}>
  <Route path="auth/*auth" component={Auth} />

  <Route path="panel/*" component={AdminRoute} />

</Router>
