import React, { Component } from 'react';
import PageContent from '../layout/PageContent';
import PageCard from '../layout/PageCard';
import KeywordForm from '../forms/KeywordForm';
import { connect } from 'react-redux';
import { getKeyword, updateKeyword } from '../../actions/keywordActions';
import RippleLoader from '../loaders/RippleLoader';
import { validateKeyword } from '../../validation/keywordValidation';

class Keyword extends Component {
    componentWillMount() {
        this.props.getKeyword();
    }

    constructor(props) {
        super(props);

        this.updateKeyword = this.updateKeyword.bind(this);
    }

    render() {
        return (
            <PageContent title={'Keyword'}>
                <PageCard>
                    <h2>Update Keyword { this.props.isLoading ? <RippleLoader /> : ''}</h2>
                    <p>
                        This is the unique keyword your potential clients will text
                        to <code>50505</code> to get your active listings. Keyword changes are
                        instant, and old keywords are not saved. Keyword updates are final.
                        Keyword reservation is only available at time of update.
                    </p>
                    <p className='m-b-40'>
                        Keywords should be 4 to 12 characters in length and be composed of
                        alphanumeric characters.
                    </p>
                    <KeywordForm onSubmit={this.updateKeyword}/>
                </PageCard>
            </PageContent>
        );
    }

    updateKeyword(values) {
        console.log(values);
        if (values.name === this.props.currentKeyword.name) {
            return;
        }

        return validateKeyword(values)
            .then(() => this.props.updateKeyword(values.name));
    }
};

const mapStateToProps = state => ({
    isLoading: state.ui.keyword.loading,
    currentKeyword: state.keyword
});

const mapDispatchToProps = dispatch => ({
    getKeyword: () => dispatch(getKeyword()),
    updateKeyword: keyword => dispatch(updateKeyword(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(Keyword);
