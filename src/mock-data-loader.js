"use strict";
exports.__esModule = true;
var MockDataLoader = (function () {
    function MockDataLoader() {
    }
    MockDataLoader.loadMockAreas = function () {
        return [
            {
                id: "1",
                name: "Area 1",
                regions: [
                    {
                        vertices: [
                            {
                                x: 45,
                                y: 45
                            },
                            {
                                x: 55,
                                y: 45
                            },
                            {
                                x: 55,
                                y: 55
                            },
                            {
                                x: 45,
                                y: 55
                            },
                        ]
                    }
                ]
            },
            {
                id: "2",
                name: "Area 2",
                regions: []
            },
            {
                id: "3",
                name: "Area 3",
                regions: []
            }
        ];
    };
    return MockDataLoader;
}());
exports["default"] = MockDataLoader;
