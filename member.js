function skillsMember() {
    return {
        restrict: 'E',
        scope: {
            member: '='
        },
        templateUrl: '/modules/skills/client/views/skills-member.html'
    };
}