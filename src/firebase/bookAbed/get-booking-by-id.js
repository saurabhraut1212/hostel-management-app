import { getFirestore, getDoc, doc } from 'firebase/firestore';
import firebaseApp from '../config';

const firestore = getFirestore(firebaseApp);

export const getDocById = async documentId => {
    try {
        const documentRef = doc(firestore, 'booking', documentId);
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
            const data = documentSnapshot.data();
            console.log(data, 'data here');
            return { status: 200, data };
        }

        return { status: 404, message: 'Document not found' };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};
