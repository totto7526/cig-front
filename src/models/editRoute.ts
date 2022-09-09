export type EditRouteStatus = 'completed' | 'pending' | 'failed';


export interface EditRoute {
    id: string;
    status: EditRouteStatus;
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    routeOrder: number;
  }