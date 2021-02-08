import React from "react"
import ContentLoader from "react-content-loader"
import './loader.scss';

export default ({ width = 200, height = 220, speed = 1, row = 5, ...props }) => (
    <div className='loader-main'>
        {
            [...Array(row).keys()].map(n => (
                <div className='loader' key={n+'loader-content'}>
                    <ContentLoader
                        speed={1}
                        width={width}
                        height={height}
                        viewBox="0 0 200 200"
                        backgroundColor="#ededed"
                        foregroundColor="#e8e8e8"
                        {...props}
                    >
                        <rect x="17" y="1" rx="0" ry="0" width="200" height="150" />
                        <rect x="17" y="165" rx="3" ry="3" width="200" height="10" />
                        <rect x="17" y="180" rx="3" ry="3" width="200" height="10" />
                    </ContentLoader>
                </div>))
        }

    </div>
)