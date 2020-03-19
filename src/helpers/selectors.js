const getAppointmentsForDay = function (state, day) {
  const results = [];
  const matchingDay = state.days.filter(item => item.name === day);
  if (matchingDay.length === 0) return results;

  const apptIDs = matchingDay[0].appointments;
  const allAppts = state.appointments;

  for (const appt in allAppts) {
    if (apptIDs.includes(allAppts[appt].id)) {
      results.push(allAppts[appt]);
    }
  }
  return results;
};

const getInterview = function (state, interview) {
  if (interview === null) return null;
  const interviewerID = interview.interviewer;
  const interviewerDetails = state.interviewers[interviewerID];
  return { ...interview, interviewer: interviewerDetails }
};


export { getAppointmentsForDay, getInterview }