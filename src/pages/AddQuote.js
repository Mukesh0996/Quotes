import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../Hooks/httpHook';
import { addQuote } from '../lib';


const AddQuote = () => {

    const { sendRequest, status, error } = useHttp(addQuote);

    const history = useHistory();
    console.log(error);
    useEffect(() => {
        if(status ==="completed") {
            history.push("/quotes");
        }
    },[status, history])

    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
    }

    return <QuoteForm isLoading={status ==="pending"} onAddQuote={addQuoteHandler}/>
}

export default AddQuote;