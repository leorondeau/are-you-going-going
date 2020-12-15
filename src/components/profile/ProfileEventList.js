import React, { useEffect, useContext, useState } from 'react'
import { EventContext } from '../event/EventProvider'
import { UserEventContext } from '../user/UsersEventsProvider'
import { ProfileGoEvent } from './ProfileGoEvent'




export const ProfileEventList = (props) => {

    const activeUserId = parseInt(localStorage.getItem("ayg__id"))

    const { events, getEvents } = useContext(EventContext)
    const { usersEvents, getUsersEvents } = useContext(UserEventContext)

    const [selectedEvent, setSelectedEvent] = useState([])
    const [eventName, setEventName] = useState([])

    useEffect(() => {

        getUsersEvents()
            .then(getEvents)

    }, [])


    useEffect(() => {
        const activeUserEvents = usersEvents.filter(ue => ue.userId === activeUserId) || {}
        setSelectedEvent(activeUserEvents)

        const eventNames = activeUserEvents.map(aue => {
            return events.find(eve => aue.eventId === eve.id)
        }) || {}
        setEventName(eventNames)

    }, [events , usersEvents ])

    return (
        <>
            <div className="events">
                <article className="eventList">
                    <h2>Going List</h2>
                    {
                        eventName.map(en => <ProfileGoEvent key={en.id} event={en} />)
                    }
                </article>
            </div>
        </>
    )
}
