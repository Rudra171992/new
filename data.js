export function genData() {
	return [
    {
      data: { Description: 'Minimized Risk/Safety Maintenance', Type: 'Goal', Discipline: 'Nursing', Action: 'View Details' },
      children: [
          {
            data: { Description: 'Complete Assessments', Type: 'Goal', Discipline: 'Nursing', Action: 'View Details' },
            children: [
              {
                data: { Description: 'Complete Fail Risk Assessment', Type: 'Goal', Discipline: 'Nursing', Action: 'View Details' },
              },
            ],
          }
        ],
      },
    {
      data: { Description: 'Optimal Comfort And WellBeing', Type: 'Goal', Discipline: 'Nursing', Action: 'View Details' },
      children: [
          {
              data: { Description: 'Complete Assessments', Type: 'Short-Term-Goal', Discipline: 'Nursing', Action: 'View Details' },
              children: [
                  {
                      data: { Description: 'Skin Integrity Assessment', Type: 'Activity', Discipline: 'Nursing', Action: 'View Details' },
                  }
              ]       
          }
      ]
    },
    {
      data: { Description: 'Reposition Patient', Type: 'Activity', Discipline: 'Nursing', Action: 'View Details' },
    },
  ];
}