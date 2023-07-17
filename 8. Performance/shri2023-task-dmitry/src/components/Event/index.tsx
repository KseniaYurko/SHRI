import { useRef, useEffect } from 'react';

interface EventProps {
  onSize?: (size: number ) => void;
  slim?: boolean;
  icon: string;
  iconLabel: string;
  title: string;
  subtitle?: string;
}

function Event(props: EventProps) {
  const ref = useRef<HTMLLIElement>(null);

  const { onSize } = props;

  useEffect(() => {
    if (onSize && ref.current) {
      const width = ref.current.offsetWidth;
      onSize(width);
    }
  }, [onSize]);

  return (
    <li ref={ref} className={'event' + (props.slim ? ' event_slim' : '')}>
      <button className="event__button">
        <span
          className={`event__icon event__icon_${props.icon}`}
          role="img"
          aria-label={props.iconLabel}
        ></span>
        <h4 className="event__title">{props.title}</h4>
        {props.subtitle && (
          <span className="event__subtitle">{props.subtitle}</span>
        )}
      </button>
    </li>
  );
}

export default Event;
