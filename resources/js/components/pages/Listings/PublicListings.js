import React, { Component } from 'react';
import NotFound from '../NotFound';
import ListingPreview from './ListingPreview';

class PublicListings extends Component {
    componentDidMount() {
        const { keyword } = this.props.match.params;

        this.fetchListings(keyword);
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            keyword: {}
        }
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading</div>
        }

        if (_.isEmpty(this.state.keyword)) {
            return <NotFound />
        }

        const { keyword: { user } } = this.state;

        return (
            <div className='public-listings'>
                { user.photo && <div className='user-photo' style={{ backgroundImage: `url('${user.photo}')`}}></div> }
                <p className='public-name'>{this.renderDisplayName(user)}Listings</p>
                <p className='cta-info'>Tap a listing to get more info.</p>

                <div className='listings-wrapper'>
                    {this.renderListings(user.listings)}
                </div>
            </div>
        );
    }

    renderListings(listings) {
        return (
            listings.map(listing => <ListingPreview key={listing.id} listing={listing} onClick={() => this.getInfo(listing)}/>)
        )
    }

    getInfo(listing) {
        if (listing.details) {
            window.location = listing.details;
        }
    }

    renderDisplayName(user) {
        if (user.first_name && user.last_name) {
            return `${user.first_name} ${user.last_name}'s `;
        }

        if (user.first_name) {
            return user.first_name + '\'s ';
        }

        return '';
    }

    fetchListings(keyword) {
        axios.get('/api/v1/keyword/' + keyword + '?include=user.listings')
            .then(response => {
                console.log(response.data);
                this.setState({ isLoading: false, keyword: response.data });
            })
            .catch(error => {
                console.log(error.response.data);
                this.setState({ isLoading: false, keyword: {} });
            })
    }
}

export default PublicListings;
