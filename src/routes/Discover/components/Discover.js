import React, { Component } from "react";
import "../styles/_discover.scss";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";

export default class Discover extends Component {
  render() {
    const { newReleases, playlists, categories } = this.props;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
