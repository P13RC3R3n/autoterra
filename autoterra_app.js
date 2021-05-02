var sidebarData = [
    {
        id: "balances", icon: "mdi mdi-view-dashboard", value: "Dashboard", onClick: () => {
            alert("clicked")
        }
    },

    {
        id: "airdrops", icon: "mdi mdi-anchor", value: "Anchor", collapsed: false, data: [
            { id: "anchor_airdrops", value: "Airdrops", icon: "mdi mdi-parachute" },
            { id: "anchor_liquidation", value: "Liquidation Protection", icon: "mdi mdi-lifebuoy" }
        ]
    }
];

var balancesData = [
    { "id": 2, "token": "LUNA", "amount": "2500" },
    { "id": 3, "token": "MIR", "amount": "850" },
    { "id": 4, "token": "ANC", "amount": "1500" },
    { "id": 5, "token": "UST", "amount": "12750" },
];

var balancesValuesData = [
    { "id": 2, "token": "LUNA", "amount": 2500 * 16.5 },
    { "id": 3, "token": "MIR", "amount": 850 * 10 },
    { "id": 4, "token": "ANC", "amount": 1500 * 5 },
    { "id": 5, "token": "UST", "amount": 12750 },
];

var balancesList = {
    height: 350,
    cols: [
        {
            rows: [
                {
                    template: "<div style='width:100%;text-align:center'>Tokens</div>",
                    height: 30
                },
                {
                    view: "chart",
                    type: "donut",
                    value: "#amount#",
                    label: "#token#",
                    pieInnerText: "#amount#",
                    shadow: 2,
                    data: balancesData,
                }
            ]
        },
        {
            rows: [
                {
                    template: "<div style='width:100%;text-align:center'>Values (in $UST)</div>",
                    height: 30
                },
                {
                    view: "chart",
                    type: "pie",
                    value: "#amount#",
                    label: "#token#",
                    pieInnerText: " $#amount#",
                    shadow: 2,
                    data: balancesValuesData,
                }
            ]
        },
        {
            rows: [
                {
                    template: "<div style='width:100%;text-align:center'>List</div>",
                    height: 30
                },
                {
                    view: "list",
                    height: 600,
                    template: "<span>#token#</span> <strong class='align-right'>#amount#</strong>",
                    data: balancesData
                },

            ]
        }
    ]
};


var airdropHistoryData = [
    { "datetime": moment().format("MMM Do, YYYY"), "amount": 3, postAction: "staked" },
    { "datetime": moment().subtract(7, 'days').format("MMM Do, YYYY"), "amount": 3, postAction: "swapped to UST" },
    { "datetime": moment().subtract(14, 'days').format("MMM Do, YYYY"), "amount": 2.75, postAction: "swapped to UST & deposited" },
    { "datetime": moment().subtract(21, 'days').format("MMM Do, YYYY"), "amount": 2.75, postAction: "swapped to UST & deposited" },
];

var liqHistory = [
    { "datetime": moment().format("MMM Do, YYYY"), "amount": "300 UST", action: "Repaid" },
    { "datetime": moment().subtract(7, 'days').format("MMM Do, YYYY"), "amount": "50 BLUNA", action: "Added collateral" },
    { "datetime": moment().subtract(7, 'days').format("MMM Do, YYYY"), "amount": "50 LUNA", action: "Swapped & Added collateral" },
];

var anchorAirdropsContent = {
    height: 350,
    cols: [
        {
            rows: [
                {
                    template: "<div style='width:100%;text-align:center'>Settings</div>",
                    height: 30
                },
                {
                    view: "form",
                    id: "log_form",
                    width: 500,
                    elementsConfig: {
                        labelWidth: 150
                    },
                    elements: [
                        { view: "switch", label: "Claim Automatically", name: "enabled" },
                        {
                            view: "richselect", options: [
                                "Stake ANC", 
                                "Swap to UST", 
                                "Swap to LUNA",
                                "Swap to UST & Deposit", 
                            ], label: "Post Claim Action",
                        },
                        {
                            margin: 10, cols: [
                                { view: "button", value: "Save", css: "webix_primary" },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            rows: [
                {
                    template: "<div style='width:100%;text-align:center'>History</div>",
                    height: 30
                },
                {
                    view: "list",
                    height: 600,
                    template: "<span>#datetime#</span> - Claimed <strong class=''>#amount# $ANC & #postAction#</strong>",
                    data: airdropHistoryData
                },

            ]
        }
    ]
}

var liquidationContent = {
    height: 1350,
    cols: [
        {
            rows: [
                {
                    template: "<div style='width:100%;text-align:center'>Settings</div>",
                    height: 30
                },
                {
                    view: "form",
                    id: "liquidation_settings_form",
                    width: 500,
                    elementsConfig: {
                        labelWidth: 150
                    },
                    elements: [
                        { view: "switch", label: "Enabled", name: "liquidation_enabled" },
                        { view: "text", label: "Threshold %", name: "liquidation_enabled" },

                        {
                            view: "radio", label: "Mechanism", value: 1, options: [
                                { id: 1, value: "Repay" }, // the initially selected item
                                { id: 2, value: "Add Collateral" }
                            ]
                        },   

                        {
                            view: "richselect", options: [
                                "UST Balance", 
                                "UST Deposit", 
                                "Anchor Balance(will be swapped to UST)",
                                "Luna Balance(will be swapped to UST)", 
                            ], label: "Repayment Source",
                        },

                        {
                            view: "richselect", options: [
                                "BLUNA Balance",
                                "LUNA Balance(will be swapped to BLUNA)",
                            ], label: "Collateral Source",
                        },

                        {
                            margin: 10, cols: [
                                { view: "button", value: "Save", css: "webix_primary" },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            rows: [
                {
                    template: "<div style='width:100%;text-align:center'>History</div>",
                    height: 30
                },
                {
                    view: "list",
                    height: 600,
                    template: "<span>#datetime#</span> - <strong class=''>#action# #amount# </strong>",
                    data: liqHistory
                },

            ]
        }
    ]
}

var mainContent = {
    id: "main",
    animate: false,
    cells: [
        {
            id: "balances", rows: [
                { view: "template", type: "header", template: "Balances " },
                balancesList
            ]
        },

        {
            id: "anchor_airdrops", rows: [
                { view: "template", type: "header", template: "Anchor Airdrops" },
                anchorAirdropsContent
            ]
        },

        {
            id: "anchor_liquidation", rows: [
                { view: "template", type: "header", template: "Liquidation Protection" },
                liquidationContent
            ]
        }

    ]
}

webix.ui({
    css: "webix_dark",
    rows: [
        {
            view: "template", type: "header", template: "<span class='logo'>AutoTerra</span> <span class='align-right nofmt'> <i class='mdi mdi-wallet'></i>&nbsp; terra19e3mmmzc6kup38n294nd0q39k2c2qhl63tho34</span>",
            css: "webix_dark",
        },

        {
            autoheight: true,
            height: 1500,
            margin: 1,
            cols: [
                {
                    multiOpen: true,
                    collapsed: false,
                    autoheight: true,
                    view: "sidebar",
                    css: "webix_dark",
                    data: sidebarData,
                    on: {
                        onAfterSelect: function (id) {
                            $$("main").setValue(id)
                            console.log(id)
                        }
                    }
                },

                mainContent
            ]
        }
    ]
});
