import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import Image from './Image';

export class Images extends Component {
    state = {
        images: [],
        count: 30,
        start: 1
    };

    componentDidMount() {
        this.fetchImages();
    };

    fetchImages = () => {
        const { count, start } = this.state;
        this.setState({ start: this.state.start + count });
        axios
            .get(`/api/photos?count=${count}&start=${start}`)
            .then(res => {
                let newImages = res.data;
                for(var i=0; i<newImages.length; i++){
                    for(var x=0; x<this.state.images.length; x++){
                        if(newImages[i].id === this.state.images[x].id){
                            newImages.splice(i, 1);
                        }
                    }
                }
                this.setState({ images: this.state.images.concat(newImages)})
            });
    };

    render(){
        return(
            <div className="images">
                <InfiniteScroll
                    dataLength={this.state.images.length}
                    next={this.fetchImages}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {this.state.images.map(image => (
                        <Image key={image.id} image={image} />
                    ))}
                </InfiniteScroll>
            </div>
        )
    };
};

export default Images;