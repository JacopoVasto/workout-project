import { useState, useMemo, useEffect } from "react";
import { program } from "../../assets/program"
import DaysDropdown from "../../components/DaysDropdown";
import WorkoutView from "../../components/WorkoutView";

const KEY = "gt_selected_day"

export default function Schedule() {

    // const [selectedDay, setSelectedDay] = useState(()=> localStorage.getItem(KEY) || "");
    
    // useEffect(()=> { localStorage.setItem(KEY, selectedDay); }, [selectedDay]);

    // const workout = useMemo(()=> program[selectedDay] ?? null, [selectedDay]);
    
    const [selectedDay, setSelectedDay] = useState("");

    const workout = useMemo(()=> (selectedDay ? program[selectedDay] : null), [selectedDay]);

    return (
        <>
            <h1>Schedule</h1>
            <div>
                <h2>Programma di allenamento</h2>
                <DaysDropdown value={selectedDay} onChange={setSelectedDay} options={program} />
                {selectedDay && <WorkoutView workout={workout} />}
            </div>
        </>
    );
}