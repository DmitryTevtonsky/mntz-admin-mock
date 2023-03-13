import { RemoteData } from 'libs/remote';
import { RootState } from 'store';

import { Payment, PaymentsStatusEnum } from '../types';

const selectData = (state: RootState): RemoteData<Payment[]> => state.adminTasks.paymentsByBloggers.data;
const selectActiveStatus = (state: RootState): PaymentsStatusEnum => state.adminTasks.paymentsByBloggers.activeStatus;

export { selectData, selectActiveStatus };
