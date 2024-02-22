const workoutsByMuscleGroup = {
    abductors: ["Side Leg Raises", "Cable Hip Abduction"],
    abs: ["Crunches", "Plank", "Russian Twists", "Hanging Leg Raises", "Mountain Climbers"],
    adductors: ["Sumo Squats", "Cable Hip Adduction"],
    back: ["Pull-Ups", "Deadlifts", "Lat Pulldowns", "Bent Over Rows"],
    biceps: ["Bicep Curls", "Hammer Curls", "Preacher Curls", "Concentration Curls"],
    calfs: ["Standing Calf Raises", "Seated Calf Raises", "Calf Press on the Leg Machine"],
    chest: ["Bench Press", "Push-Ups", "Chest Flyes", "Incline Bench Press"],
    core: ["Planks", "Russian Twists", "Ab Rollouts"],
    forearms: ["Wrist Curls", "Reverse Wrist Curls", "Farmer's Walk"],
    gluteus: ["Squats", "Lunges", "Hip Thrusts", "Glute Bridges"],
    hamstring: ["Deadlifts", "Leg Curls", "Glute-Ham Raises"],
    hands: ["Grip Strengtheners", "Hand Extensions"],
    latissimus: ["Pull-Ups", "Lat Pulldowns", "Chin-Ups"],
    legs: ["Squats", "Leg Press", "Lunges", "Step-Ups"],
    neck: ["Neck Curls", "Neck Extensions"],
    quadriceps: ["Squats", "Leg Press", "Lunges", "Leg Extensions"],
    shoulders: ["Shoulder Press", "Lateral Raises", "Front Raises"],
    triceps: ["Tricep Dips", "Skull Crushers", "Tricep Pushdowns"],
};



async function fetchAndDisplayBaseImage() {
    function getRandomSubset(arr, size) {
        const maxSubsetSize = 2; 
        const adjustedSize = Math.min(size, maxSubsetSize); 
        
        const shuffled = arr.slice(0);
        let i = arr.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, adjustedSize);
    }

    function getRandomWorkoutsForMuscleGroups(muscleGroups) {
        const workouts = [];
        muscleGroups.forEach(muscleGroup => {
            const possibleWorkouts = workoutsByMuscleGroup[muscleGroup.replace(/_/g, " ")] || [];
            const selectedWorkout = possibleWorkouts[Math.floor(Math.random() * possibleWorkouts.length)];
            if (selectedWorkout && !workouts.includes(selectedWorkout)) {
                workouts.push(selectedWorkout);
            }
        });
        return workouts.slice(0, 5); 
    }
    
    const muscleGroups = [
        "abductors",
        "abs",
        "adductors",
        "back",
        "biceps",
        "calfs",
        "chest",
    ];
    const secMuscleGroups = [
        "core",
        "forearms",
        "gluteus",
        "hamstring",
        "hands",
        "latissimus",
        "legs",
        "neck",
        "quadriceps",
        "shoulders",
        "triceps"
    ];
    
    const updatedMuscleGroups = muscleGroups.map(muscleGroup => muscleGroup.replace(/_/g, " "));
    const selectedPrimaryMuscleGroups = getRandomSubset(muscleGroups, 5); 
    const selectedSecMuscleGroups = getRandomSubset(secMuscleGroups, 5); 
    const url = `https://muscle-group-image-generator.p.rapidapi.com/getMulticolorImage?primaryColor=240%2C100%2C80&secondaryColor=0%2C0%2C255&primaryMuscleGroups=${selectedPrimaryMuscleGroups.join(",")}&secondaryMuscleGroups=${selectedSecMuscleGroups.join(",")}&transparentBackground=0`;
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b9d8b208b0msh720765f92eb60afp1774bajsn08b6270b73f7',
            'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = 'Base image without muscle groups highlighted';
        const container = document.getElementById('image-container');
        container.innerHTML = ''; 
        container.appendChild(imageElement);
    } catch (error) {
        console.error(error);
    }

    const primaryWorkouts = getRandomWorkoutsForMuscleGroups(selectedPrimaryMuscleGroups);
    const secondaryWorkouts = getRandomWorkoutsForMuscleGroups(selectedSecMuscleGroups);

    const primaryMusclesContainer = document.createElement('div');
    primaryMusclesContainer.innerHTML = `<h3 style="color: #5C574F;">Selected Primary Muscle Groups:</h3><p style="color: #5C574F;">${selectedPrimaryMuscleGroups.join(', ').replace(/_/g, ' ')}</p><h4 style="color: #5C574F;">Workouts:</h4><ul style="color: #5C574F;">${primaryWorkouts.map(workout => `<li style="color: #5C574F;">${workout}</li>`).join('')}</ul>`;

    const secondaryMusclesContainer = document.createElement('div');
    secondaryMusclesContainer.innerHTML = `<h3 style="color: #5C574F;">Selected Secondary Muscle Groups:</h3><p style="color: #5C574F;">${selectedSecMuscleGroups.join(', ').replace(/_/g, ' ')}</p><h4 style="color: #5C574F;">Workouts:</h4><ul style="color: #5C574F;">${secondaryWorkouts.map(workout => `<li style="color: #5C574F;">${workout}</li>`).join('')}</ul>`;

    const displayContainer = document.getElementById('muscle-group-display-container');
    if (displayContainer) {
        displayContainer.appendChild(primaryMusclesContainer);
        displayContainer.appendChild(secondaryMusclesContainer);
    } else {
        console.log('Display container not found');
    }

}
fetchAndDisplayBaseImage();

