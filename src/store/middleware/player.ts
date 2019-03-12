// import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
// import { SleepTimer } from "../../model/audio";
// import { PlayerActionType } from "../actions/AudioPlayer";
// import { uiOpenSnackbar, uiCloseSnackbar } from '../actions/Ui';
// import { pauseAudio } from '../actions/AudioPlayer';
//
// let sleepTimer: SleepTimer;
//
// export const playerMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => action => {
//
//     if (action.type === PlayerActionType.SET_SLEEP_TIMER) {
//         console.log('SET_SLEEP_TIMER');
//         let message = "";
//         const actionName = new String(action.type).toString();
//         const minutes = 60 * 60 * 1000;
//         console.log(action);
//         if (sleepTimer && sleepTimer.handle) {
//             message = `Previous timer of ${sleepTimer.duration/minutes} minutes cleared.`;
//             clearInterval(sleepTimer.handle);
//         }
//         if (action.timerDuration !== null) {
//             sleepTimer = {
//                 duration: action.timerDuration,
//                 dateSet: new Date(),
//                 handle: setTimeout(() => {
//                     store.dispatch(uiOpenSnackbar(actionName, "Time's up! Audio will stop playing."));
//                     setTimeout(() => {
//                         store.dispatch(pauseAudio());
//                         store.dispatch(uiCloseSnackbar(actionName));
//                     }, 4000);
//                 }, action.timerDuration)
//             };
//             store.dispatch(uiOpenSnackbar(actionName, `${message} New Sleep timer set for ${action.timerDuration / minutes} minutes`));
//             setTimeout(() => {
//                 store.dispatch(uiCloseSnackbar(actionName));
//             }, 4000);
//         }
//     }
//     return next(action);
// };