import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
        
import {getNewRelease, getFeaturePlaylist, getcategories } from '../actions';
const Discover = React.lazy(() => import('../components/Discover'));


const Loader = () => (<div>Loading...</div>);
const DiscoverContainer = (props) => {
    
    // making 3 parallel calls
    useEffect(() => {
        props.getNewReleaseAPI('new-releases');
        props.getFeaturedPlaylistAPI('featured-playlists');
        props.getCategoriesAPI('categories');
    }, [])
    return (
        <Suspense fallback={() => <Loader />}>
            <Discover {...props}/>
        </Suspense>
    )
}

const mapStateToProps = (state, props) => { 
    const data = state;
    console.log('data', data);
    return {...data};
}

const mapDispatchToProps = (dispatch) => {
    return {    
        getNewReleaseAPI: (data_type) => dispatch(getNewRelease(data_type)),
        getFeaturedPlaylistAPI: (data_type) => dispatch(getFeaturePlaylist(data_type)),
        getCategoriesAPI: (data_type) => dispatch(getcategories(data_type)),
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverContainer);

