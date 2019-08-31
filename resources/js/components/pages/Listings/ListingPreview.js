import React, { Component } from 'react';

class ListingPreview extends Component {
    render() {
        const { listing, onClick } = this.props;

        return (
            <div onClick={onClick} className='listing-preview' style={{ backgroundImage: `url('${listing.thumb}')`}}>
                <div className='details'>
                    <div className='price-and-info'>
                        <div className='price'>{this.formatPrice(listing.price)}</div>
                        <div className='info'>{this.renderInfo(listing)}</div>
                    </div>
                    <div className='address'>{listing.address}</div>
                </div>
            </div>
        );
    }

    renderInfo(listing) {
        const { beds, baths, sqft } = listing;

        let output = [];

        if (beds) output.push(`${beds} bd`);
        if (baths) output.push(`${baths} ba`);
        if (sqft) output.push(`${this.f(sqft)} sqft`);

        return output.join(' • ');
    }

    formatPrice(price) {
        if (price) {
            return `$ ${this.f(price)}`;
        }
    }

    f(x) {
        if (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}

export default ListingPreview;
