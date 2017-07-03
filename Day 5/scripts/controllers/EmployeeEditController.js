hrApp.controller('EmployeeEditController', ['$scope', '$routeParams', '$http', '$location', 'CommonResourcesFactory', 'EmployeeService', 'DepartmentService', 'JobService', 'ManagerService',
    function($scope, $routeParams, $http, $location, CommonResourcesFactory, EmployeeService, DepartmentService, JobService, ManagerService) {
        $scope.employee = {};
        $scope.requiredErrorMessage = "Please fill out this form!";
        $scope.patternDateNotRespectedMessage = "The date format should be YYYY-MM-DD";
        $scope.patternCommisionNotRespectedMessage = "Commission should be in the format 0.XX";

        //TODO #HR5

        $scope.employees=[];
        $scope.managers=[];
        $scope.departments=[];
        $scope.jobs=[];

        /*$scope.departments=DepartmentService.findAllDepartments();
         $scope.jobs=JobService.findAllJobs();*/
        EmployeeService.findById($routeParams.employeeId)
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

                },
                function(err) {
                    console.log("Error at managers service: " + err);
                }
            );

        /**
         * Reset form
         */
        $scope.reset = function () {
            $scope.employee = {};
        };

        /**
         * Persist an employee
         * @param addEmployee - employee to be persisted
         */
        $scope.create = function (addEmployee) {
            $http({url: CommonResourcesFactory.editEmployeeUrl, method: 'PUT', data: addEmployee})
                .success(function (data) {
                    $scope.employee = data;
                    $location.url('/employeeView/' + $scope.employee.employeeId);
                });
        };

        $scope.datePattern = /^\d{4}-\d{2}-\d{2}$/;
        $scope.commissionPattern =  /^[0]\.\d{1}(\d)?$/;

    }]);