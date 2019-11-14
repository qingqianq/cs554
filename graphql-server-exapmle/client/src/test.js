
{({ data }) => {
  const { employers } = data;
  if (!employers) {
    return null;
  }
  return (
    <div>
      {employers.map(employer => {
        return (
          <div className="card" key={employer.id}>
            <div className="card-body">
              <h5 className="card-title">{employer.name}</h5>
              <span>Number of Employees:</span>{" "}
              {employer.numOfEmployees}
              <ol>
                {employer.employees.map(employee => {
                  return (
                    <li key={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        );
      })}
    </div>
  );
}}

