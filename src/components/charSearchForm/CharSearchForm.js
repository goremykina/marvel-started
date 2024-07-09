import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import useMarvelService from "../../services/MarvelService";
import * as Yup from 'yup'
import './charSearchForm.scss'
import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

export default function CharSearchForm () {
    const [char, setChar] = useState(undefined)

    const { getCharacterByName, clearError, loading, error } = useMarvelService()

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
            .catch(e => console.log(e))
    }

    const getSearchResults = () => {
        if (error) {
            return (
                <div className="char__search-critical-error"><ErrorMessage/></div>
            );
        }

        if (char === null) {
            return (
                <div className="char__search-error">
                    The character was not found. Check the name and try again
                </div>
            );
        }

        if (char) {
            return (
                <div className="char__search-wrapper">
                    <div className="char__search-success">There is! Visit {char.name} page?</div>
                    <Link to={`/characters/${char.id}`} className="button button__secondary">
                        <div className="inner">To page</div>
                    </Link>
                </div>
            );
        }
    }


    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    char: ''
                }}
                validationSchema={Yup.object({
                    char: Yup.string().required('This field is required')
                })}
                onSubmit={({ char }) => {
                    updateChar(char);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="char">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="char"
                            name='char'
                            type='text'
                            placeholder="Enter name"/>
                        <button
                            type='submit'
                            className="button button__main"
                            disabled={loading}
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    {/*<FormikErrorMessage component="div" className="char__search-error" name="char"/>*/}
                </Form>
            </Formik>
            {getSearchResults()}
        </div>
    )
}
