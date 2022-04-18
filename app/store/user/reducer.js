
import { ActionTypes } from "../ActionTypes";

const INITIAL_STATE = {
    loggedin: false,
    profile: {},
    resumen: {},
    loading: false,
    products: [],
    submissions: [],
    submissions1: [],
    activiades: [],
    grafico: [],
    descuento: [],
    puntos: [],
    wallet: [],
    canjear: [],
    facturas: [],
    correos: [],
    products: [],
    loadingSubmissions: false,
    registerProfile: {
        flag: 'signup',
        nombre: null,
        apellido: null,
        provincia: null,
        direccion: null,
        cod: null,
        telefono: null,
        correo: null,
        localidad: null,
        username: null,
        password: null,
        TipoUsuario: null,
    }
}
export const UserReducer = (
    state = INITIAL_STATE,
    action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_START:
            return {
                ...state,
                loading: true,
            };
        case ActionTypes.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
            };

        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedin: true,
                profile: action.payload.profile,
                resumen: action.payload.resumen
            };
            
        case ActionTypes.GET_SUBMISSIONS_START:
            return {
                ...state,
                loadingSubmissions: true,
            };
        case ActionTypes.GET_SUBMISSIONS_FAILED:
            return {
                ...state,
                loadingSubmissions: false,
            };
        case ActionTypes.GET_SUBMISSIONS_SUCCESS:
            return {
                ...state,
                loadingSubmissions: false,
                submissions: action.payload
            };


            case ActionTypes.GET_SUBMISSIONS1_START:
                return {
                    ...state,
                    loadingSubmissions1: true,
                };
            case ActionTypes.GET_SUBMISSIONS1_FAILED:
                return {
                    ...state,
                    loadingSubmissions1: false,
                };
            case ActionTypes.GET_SUBMISSIONS1_SUCCESS:
                return {
                    ...state,
                    loadingSubmissions1: false,
                    submissions1: action.payload
                };

                case ActionTypes.GET_ACTIVIDADES_START:
                return {
                    ...state,
                    loadingActividades: true,
                };
            case ActionTypes.GET_ACTIVIDADES_FAILED:
                return {
                    ...state,
                    loadingActividades: false,
                };
            case ActionTypes.GET_ACTIVIDADES_SUCCESS:
                return {
                    ...state,
                    loadingActividades: false,
                    actividades: action.payload
                };


                case ActionTypes.GET_GRAFICO_START:
                return {
                    ...state,
                    loadingGrafico: true,
                };
            case ActionTypes.GET_GRAFICO_FAILED:
                return {
                    ...state,
                    loadingGrafico: false,
                };
            case ActionTypes.GET_GRAFICO_SUCCESS:
                return {
                    ...state,
                    loadingGrafico: false,
                    grafico: action.payload
                };

                case ActionTypes.GET_DESCUENTO_START:
                    return {
                        ...state,
                        loadingDescuento: true,
                    };
                case ActionTypes.GET_DESCUENTO_FAILED:
                    return {
                        ...state,
                        loadingDescuento: false,
                    };
                case ActionTypes.GET_DESCUENTO_SUCCESS:
                    return {
                        ...state,
                        loadingDescuento: false,
                        descuento: action.payload
                    };


                case ActionTypes.GET_PUNTOS_START:
                return {
                    ...state,
                    loadingPuntos: true,
                };
            case ActionTypes.GET_PUNTOS_FAILED:
                return {
                    ...state,
                    loadingPuntos: false,
                };
            case ActionTypes.GET_PUNTOS_SUCCESS:
                return {
                    ...state,
                    loadingPuntos: false,
                    puntos: action.payload
                };



                case ActionTypes.GET_WALLET_START:
                    return {
                        ...state,
                        loadingWallet: true,
                    };
                case ActionTypes.GET_WALLET_FAILED:
                    return {
                        ...state,
                        loadingWallet: false,
                    };
                case ActionTypes.GET_WALLET_SUCCESS:
                    return {
                        ...state,
                        loadingWallet: false,
                        wallet: action.payload
                    };




                case ActionTypes.GET_CANJEAR_START:
                return {
                    ...state,
                    loadingCanjear: true,
                };
            case ActionTypes.GET_CANJEAR_FAILED:
                return {
                    ...state,
                    loadingCanjear: false,
                };
            case ActionTypes.GET_CANJEAR_SUCCESS:
                return {
                    ...state,
                    loadingCanjear: false,
                    canjear: action.payload
                };


                case ActionTypes.GET_FACTURAS_START:
                return {
                    ...state,
                    loadingFacturas: true,
                };
            case ActionTypes.GET_FACTURAS_FAILED:
                return {
                    ...state,
                    loadingFacturas: false,
                };
            case ActionTypes.GET_FACTURAS_SUCCESS:
                return {
                    ...state,
                    loadingFacturas: false,
                    facturas: action.payload
                };
                

                case ActionTypes.GET_CORREOS_START:
                    return {
                        ...state,
                        loadingCorreos: true,
                    };
                case ActionTypes.GET_CORREOS_FAILED:
                    return {
                        ...state,
                        loadingCorreos: false,
                    };
                case ActionTypes.GET_CORREOS_SUCCESS:
                    return {
                        ...state,
                        loadingCorreos: false,
                        correos: action.payload
                    };



        case ActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload
            };
        case ActionTypes.UPDATE_REGISTER_PROFILE:
            return {
                ...state,
                registerProfile: action.payload
            };
        case ActionTypes.LOG_OUT:
            return INITIAL_STATE
        default:
            return state;
    }
};