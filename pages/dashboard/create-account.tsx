import LoadingComponent from '@/modules/common/LoadingComponent';
import dynamic from 'next/dynamic';

const AddMemberForm = dynamic(() => import('@/modules/create-account'), 
{ ssr: false ,  
loading: () => <LoadingComponent/>
});



export default AddMemberForm;