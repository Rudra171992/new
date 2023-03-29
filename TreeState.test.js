import TreeState from "./TreeState"

function genData() {
	return [
    {
    data: { Description: 'Minimized Risk/Safety Maintenance', Type: 'Goal', Discipline: 'Nursing', Actions: 'View Details' },
    children: [
        {
          data: { Description: 'Complete Assessments', Type: 'Goal', Discipline: 'Nursing', Actions: 'View Details' },
          children: [
            {
              data: { Description: 'Complete Fail Risk Assessment', Type: 'Goal', Discipline: 'Nursing', Actions: 'View Details' },
            },
          ],
        }
      ],
    },
    {
        data: { Description: 'Optimal Comfort And WellBeing', Type: 'Goal', Discipline: 'Nursing', Actions: 'View Details' },
        children: [
            {
                data: { Description: 'Complete Assessments', Type: 'Short-Term-Goal', Discipline: 'Nursing', Actions: 'View Details' },
                children: [
                    {
                        data: { Description: 'Skin Integrity Assessment', Type: 'Activity', Discipline: 'Nursing', Actions: 'View Details' },
                    }
                ]       
            }
        ]
    },
    {
        data: { Description: 'Reposition Patient', Type: 'Activity', Discipline: 'Nursing', Actions: 'View Details' },
    },
  ];
}


test("Test Tree state", () => {
    const treeState = new TreeState(genData());
    const treeData = TreeState.create(genData());

    const filteredData = TreeState.toggleChildren(treeData, treeData._dataRowModel[0]);

    console.log(filteredData);
})