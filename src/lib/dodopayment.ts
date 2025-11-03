import DodoPayments from "dodopayments";


const useLiveMode = process.env.NODE_ENV === "production";


const apiKey = useLiveMode 
  ? process.env.DODO_API_KEY_LIVE 
  : process.env.DODO_API_KEY_TEST;

const environment = useLiveMode ? "live_mode" : "test_mode";


//console.log(`DodoPay initialized in ${environment} mode`);

export const dodopayments = new DodoPayments({
  bearerToken: apiKey,
  environment: environment,
});


export const isLiveMode = () => useLiveMode;