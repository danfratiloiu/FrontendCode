hrApp.controller('EmployeeAddController', ['$scope', '$http', '$location', 'CommonResourcesFactory', 'EmployeeService', 'DepartmentService', 'JobService', 'ManagerService',
    function($scope, $http, $location, CommonResourcesFactory, EmployeeService, DepartmentService, JobService, ManagerService) {
        $scope.employee = {};
        $scope.requiredErrorMessage = "Please fill out this form!";
        $scope.patternDateNotRespectedMessage = "The date format should be YYYY-MM-DD";
        $scope.patternCommisionNotRespectedMessage = "Commission should be in the format 0.XX";

        //TODO #HR1
        $scope.employees=[];
        $scope.managers=[];
        $scope.departments=[];
        $scope.jobs=[];
        var testManager=[];

        /*$scope.departments=DepartmentService.findAllDepartments();
        $scope.jobs=JobService.findAllJobs();*/
        EmployeeService.findById()
            .then(function (res)
                {
                    $scope.employee=res.data;
                },
                function(err) {
                    console.log("Error at employee service: " + err);
                }
            );




        DepartmentService.findAllDepartments()
            .then(function (res)
                {
                    $scope.departments=res.data;
                },
                function(err) {
                console.log("Error at departments service: " + err);
                }
            );
        JobService.findAllJobs()
            .then(function (res)
                {
                    $scope.jobs=res.data;
                },
                function(err) {
                    console.log("Error at jobs service: " + err);
                }
            );
        ManagerService.findAllManagers()
            .then(function (res)
                {
                    $scope.employees=res.data;
                    for(i in $scope.employees) {
                        if (($scope.employees[i].managerId != null) && (testManager.indexOf($scope.employees[i].managerId.employeeId) == -1)) {
                            testManager.push($scope.employees[i].managerId.employeeId);
                        }
                    }
                    for(i in $scope.employees){
                        if( testManager.indexOf($scope.employees[i].employeeId) != -1){
                            $scope.managers.push($scope.employees[i]);
                        }
                    }

                },
                function(err) {
                    console.log("Error at managers service: " + err);
                }
            );

        /**
         * Reset form
         */
        $scope.reset = function () {
            this.employee = {};
        };

        /**
         * Persist an employee
         * @param addEmployee - employee to be persisted
         */
        $scope.create = function (addEmployee) {
            $http({url: CommonResourcesFactory.addEmployeeUrl, method: 'POST', data: addEmployee})
                .success(function (data) {
                    $scope.employee = data;
                    $location.url('/employeeView/' + $scope.employee.employeeId);
                });
        };

        $scope.datePattern = /^\d{4}-\d{2}-\d{2}$/;
        $scope.commissionPattern = /^[0]\.\d{1}(\d)?$/;
}]);