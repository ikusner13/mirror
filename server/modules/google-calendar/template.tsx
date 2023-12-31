import renderToString from "preact-render-to-string";

export type CalendarDTO = {
  id: string;
  kind: string;
  startDateTime: string;
  summary: string;
};

type CalendarTemplateProps = {
  events: CalendarDTO[];
  formatFunction: (date: string) => string;
};

function CalendarTemplate(props: CalendarTemplateProps) {
  const { events, formatFunction } = props;
  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => {
        return (
          <div>
            <div className="flex gap-2 items-center">
              <i className="ri-calendar-event-line"></i>
              <p>{event.summary}</p>
            </div>
            <div>
              <p className="text-sm">{formatFunction(event.startDateTime)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function generateCalendarHTML(
  events: CalendarDTO[],
  formatFunction: (date: string) => string,
) {
  return renderToString(
    <CalendarTemplate events={events} formatFunction={formatFunction} />,
  );
}
