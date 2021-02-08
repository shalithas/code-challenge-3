import React, { useEffect, useState } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { useSelector, useDispatch } from "react-redux";
import { fetchList } from "actions";

export default props => {
  const dispatch = useDispatch();
  const [modal,setModal] = useState(false);
  const {rloader=false,floader=false,bloader=false, ...data} = useSelector(({app})=>app);
  const {token=null} = useSelector(({auth})=>auth);
  useEffect(()=>{
    if(token)
    dispatch(fetchList());
  },[token])
  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={data?.released} loader={rloader} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={data?.featured} loader={floader} />
      <DiscoverBlock text="BROWSE" id="browse" data={data?.browse} imagesKey="icons" loader={bloader} />
    </div>
  );
}
