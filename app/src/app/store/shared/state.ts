import { IAlert } from "@app/_models/IAlert.interface";

export interface SharedState {
  isLoading: boolean;
  loading: number;
  alert: IAlert;
}
export const SharedState: SharedState = {
  isLoading: false,
  loading: 0,
  alert: <IAlert>{},
};
