

import LoadingComponent from '@/modules/common/LoadingComponent';
import dynamic from 'next/dynamic';

const ProductList = dynamic(() => import('@/modules/product-list'),
    {
        ssr: false,
        loading: () => <LoadingComponent />
    });



export default ProductList;