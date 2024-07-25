import { CSSProperties } from 'react';
import './process-circles.css';

type ProcessCirclesProps = {
    countOfCircles: number;
    activeCircle: number | null;
    style?: CSSProperties;
};

type Circle = {
    active: boolean;
}

export const ProcessCircles = ({ countOfCircles, activeCircle, style }: ProcessCirclesProps) => {
    if(activeCircle !== null)
        if(activeCircle < 1 || activeCircle > countOfCircles) activeCircle = null;

    const circles: Circle[] = [];

    for (let index = 0; index < countOfCircles; index++) {
        circles.push({
            active: index === activeCircle
        });
    }
    
    return (
        <div className="process-circles" style={style}>
            {
                circles.map((circle, index) => {
                    return (
                        <span className={`${ circle.active ? 'active' : ''}`} key={index}></span>
                    );
                })
            }
        </div>
    );
};