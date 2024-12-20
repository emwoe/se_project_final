import React from 'react'
import { useEffect } from 'react'
import ButtonLink from '../ButtonLink/ButtonLink'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'
import './SearchForm.css'
import { CurrentUserContext } from '../../contexts/CurrentUser.js'

function SearchForm({ onAddTopic, isLoading, isTopicReady, setIsTopicReady }) {
    const { values, resetForm, errors, isValid, handleChange } =
        useFormAndValidation()
    const currentUser = React.useContext(CurrentUserContext)

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (!isValid) {
            return
        }
        onAddTopic({ values }, resetForm)
    }

    useEffect(() => {
        setIsTopicReady(false)
    }, [])

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <h3 className="search-form__title">
                What do you want to learn about today?
            </h3>
            <p className="search-form__instructions">
                Please enter a search term. We recommend a historical event,
                scientific process, or theoretical concept.
            </p>
            <input
                className="search-form__input"
                type="text"
                id="userTopic"
                placeholder=""
                name="userTopic"
                value={values.userTopic || ''}
                minLength="2"
                maxLength="100"
                onChange={handleChange}
            ></input>

            <button
                type="submit"
                className={`search-form__submit-btn ${
                    !isValid ? 'search-form__btn_inactive' : ''
                } $`}
                disabled={!isValid}
            >
                Figure out what I need to know...
            </button>
            <div
                className={`search-form__btn-container ${
                    !isTopicReady || isLoading == true
                        ? 'search-form__btn-container_invbl'
                        : ''
                }`}
            >
                <ButtonLink className="search-form__btnlink" to="/study-page">
                    and let's go!
                </ButtonLink>
            </div>
        </form>
    )
}

export default SearchForm
