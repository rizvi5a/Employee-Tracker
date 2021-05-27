-- USE employees;
-- select e.first_name,e.last_name,e.role_id, r.title,r.salary from employee e, role r where e.role_id = r.id;

-- select d.id, d.name,sum(r.salary) from department d, role r where d.id= r.department_id group by r.department_id;

select first_name,last_name from employee where manager_id=1;