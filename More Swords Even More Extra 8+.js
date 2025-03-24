(function EFB2Mod() {

        function EFB2__defineExecCmdAsGlobal() {
            var getServer = ModAPI.reflect.getClassById("net.minecraft.server.MinecraftServer").staticMethods.getServer.method;
            globalThis.efb2__executeCommandAs = function efb2__executeCommandAs($commandsender, command, feedback) {
                var server = getServer();
                if (!server) { return };
                var commandManager = server.$commandManager;

                //lie a bit
                var x = $commandsender.$canCommandSenderUseCommand;
                $commandsender.$canCommandSenderUseCommand = () => 1;

                var y = $commandsender.$sendCommandFeedback;
                $commandsender.$sendCommandFeedback = feedback ? () => 1 : () => 0;

                const notifyOps0 = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0;
                const notifyOps = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators;
                const addChatMsg = $commandsender.$addChatMessage;

                if (!feedback) {
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = () => { };
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = () => { };
                    $commandsender.$addChatMessage = () => { };
                }

                try {
                    commandManager.$executeCommand($commandsender, ModAPI.util.str(command));
                } catch (error) {
                    console.error(error);
                }

                if (!feedback) {
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = notifyOps0;
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = notifyOps;
                    $commandsender.$addChatMessage = addChatMsg;
                }

                $commandsender.$canCommandSenderUseCommand = x;
                $commandsender.$sendCommandFeedback = y;
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineExecCmdAsGlobal);
        EFB2__defineExecCmdAsGlobal();
    
        function EFB2_defineAttrMapSet() {
            const AttributeModifier = ModAPI.reflect.getClassByName("AttributeModifier").constructors.find(x => x.length === 4);
            const secretUUID = ModAPI.reflect.getClassByName("Item").staticVariables.itemModifierUUID;
            globalThis.efb2__attrMapSet = function efb2__attrMapSet(map, key, value) {
                map.$put(ModAPI.util.str(key), AttributeModifier(secretUUID, ModAPI.util.str("Tool modifier"), value, 0));
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2_defineAttrMapSet);
        EFB2_defineAttrMapSet();
    
        function EFB2__defineExecCmdGlobal() {
            globalThis.efb2__executeCommand = function efb2__executeCommand($world, $blockpos, commandStr, feedback) {
                if ($world.$isRemote) {
                    return;
                }
                function x() {
                    ModAPI.reflect.getSuper(ModAPI.reflect.getClassByName("CommandBlockLogic"))(this);
                }
                ModAPI.reflect.prototypeStack(ModAPI.reflect.getClassByName("CommandBlockLogic"), x);
                var vector = ModAPI.reflect.getClassByName("Vec3").constructors[0]($blockpos.$x + 0.5, $blockpos.$y + 0.5, $blockpos.$z + 0.5);
                x.prototype.$getEntityWorld = () => { return $world };
                x.prototype.$getCommandSenderEntity = () => { return null };
                x.prototype.$updateCommand = () => { };
                x.prototype.$addChatMessage = (e) => { console.log(e) };
                x.prototype.$func_145757_a = () => { };
                x.prototype.$getPosition = () => { return $blockpos };
                x.prototype.$getPosition0 = () => { return $blockpos };
                x.prototype.$getPositionVector = () => { return vector };
                x.prototype.$func_145751_f = () => { return 0 };
                x.prototype.$sendCommandFeedback = () => { return feedback ? 1 : 0 }
                var cmd = new x();
                cmd.$setCommand(ModAPI.util.str(commandStr));

                const notifyOps0 = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0;
                const notifyOps = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators;

                if (!feedback) {
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = () => { };
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = () => { };
                }

                try {
                    cmd.$trigger($world);
                } catch (error) {
                    console.error(error);
                }

                if (!feedback) {
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = notifyOps0;
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = notifyOps;
                }
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineExecCmdGlobal);
        EFB2__defineExecCmdGlobal();
    
        function EFB2__defineMakeVec3() {
            var mkVec3 = ModAPI.reflect.getClassById("net.minecraft.util.Vec3").constructors.find(x => x.length === 3);
            globalThis.efb2__makeVec3 = function efb2__makeVec3(x, y, z) {
                return mkVec3(x, y, z);
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineMakeVec3);
        EFB2__defineMakeVec3();
    

(function MetadataDatablock() {
    ModAPI.meta.title("More Swords Even More Extra 8+");
    ModAPI.meta.version("V1.0");
    ModAPI.meta.description("More swords");
    ModAPI.meta.credits("By Death");
})();
(function IconDatablock() {
    ModAPI.meta.icon("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAARlJREFUOE9jZCAD/JnG8B+mjZFU/SDNzJktYG1/p9cwkGQAQrMzAwPDXtIMAGu212D4e/AGA8gFINtZshgYiXLB/kSB/w4lEgwHel4wgGiQISDNIG8QNKDbhPF/YdJ/hv55jAwg+vBpAQbH+R/g+vAaANJsosvPcObyRwYYXXrmP4oenAZ4CrH8d1L6y7DvHjNDmT8PQ9fGLwzb3/3BUA8XMJCQgcctyG+Sv16AowpmCDbNKGEAMoCPjYOBl4eL4fKzpwzaTB/hSQSXZoxABBkiLSTE8PnLN4YHn96DDXj04S3ecEKRRHYFSDPIJUQbANMMs1mBTxDsCoIGwAIP5H9kDXICwuBAJcoAkL+JcS62jAcOA2Jtw2YAANFDgMTa7Yh+AAAAAElFTkSuQmCC");
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD8SURBVDhPY2QgA6RMmPAfymQg2QCQ5nQ3NzC7a+pUBiYwi0gA02ykeQkqQgIAaT597dr/v/9XgOnQ7Gy4NwgCZM07T56kkWaQQhCGcsEAxAdpwqcZJRBVRETAmkBsEB1qacngYnafYc8pRYY5ixYxrJ46FSPWUARAmkCGnD1+nCElLo5BktOc4fn3kzg1gwDWaDQG2kyMZhDAkHBxcfnvkpDAcOfNG4aPt2/j1QwCKC7wNBP9r8J1C+wFEOBXVWUgFGVwA0CaHQyFGA5ceAu2FWQ7CBMyhBEW6iz7+sCabzz6iuJkmGZcXgEbAAt5Qv7FBphAzoT5mXTAwAAAUqOniIYGHicAAAAASUVORK5CYII=";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["NONE"];
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        function $$CustomItem() {
            $$itemSuper(this);
              this.$maxStackSize = (1);this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabTools);;
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            ($$player).$setItemInUse($$itemstack,32);
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            ;
        }
        $$CustomItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$getItemAttributeModifiers = function () {
            __efb2_arg_attribute_map = $$itemGetAttributes.apply(this, []);
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", 17);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 2048);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("nether_star_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("nether_star_sword"), ModAPI.util.str("nether_star_sword"), $$custom_item);
            ModAPI.items["nether_star_sword"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("nether_star_sword"));
        });
        AsyncSink.L10N.set("item.nether_star_sword.name", "Nether Star Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/nether_star_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/nether_star_sword"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 0.55, 0.55, 0.55 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.7, 1.7, 1.7 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/nether_star_sword.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();(function CraftingRecipeDatablock() {
    function $$registerRecipe() {
        function $$internalRegister() {
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function $$ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
            var $$resultItemArg = "item/nether_star_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "nether_star",
                
            },"B": {
                type: "item",
                id: "stick",
                
            },
            };
            var $$recipePattern = [
                "A","A","B",
            ];
            var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            var $$recipeInternal = [];
            Object.keys($$recipeLegend).forEach(($$key) => {
                $$recipeInternal.push($$ToChar($$key));
                var $$ingredient = ($$recipeLegend[$$key].type === "block" ? $$itemStackFromBlockWithMeta(ModAPI.blocks[$$recipeLegend[$$key].id].getRef(),1,$$recipeLegend[$$key].meta) : ModAPI.items[$$recipeLegend[$$key].id].getRef());
                $$recipeInternal.push($$ingredient);
            });

            var $$recipeContents = $$recipePattern.map(row => ModAPI.util.str(row));
            var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal));

            var $$resultItem = $$resultItemArg.startsWith("block/") ?
                ($$itemStackFromBlockWithMeta(ModAPI.blocks[$$resultItemArg.replace("block/", "").split("@")[0]].getRef(),1,$$resultItemArg.replace("block/", "").split("@")[1] || 0))
                : ($$itemStackFromItem(ModAPI.items[$$resultItemArg.replace("item/", "")].getRef(), 1));
            
            (function ($$itemstack) {})($$resultItem);
            
            var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
            
        }

        if (ModAPI.items) {
            $$internalRegister();
        } else {
            ModAPI.addEventListener("bootstrap", $$internalRegister);
        }
    }
    ModAPI.dedicatedServer.appendCode($$registerRecipe);
    $$registerRecipe();
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAHHSURBVChTlZKxS0JRFMbPtZYKEQfR5SWJkEIglEiG1OJgNJSEQwhBk5JTk/QHKASBU0MgNAmhlC0NgWBLGKGlUGBQgtkijxD1tQRye+fqe/lUhH7D897jud899zsHFGx7vbS3FIlEIn27HtFotBu0zM7QYDCozFjas7AAwQ+qNdttaHCfoLLZbFSn1wPP81A4KxNYd+goBjFzJIGtBRq62aEKTQTrqtVqkMvlYHmuw2KrvkNQsZVIMpnsrcRTBhecXj0Tv99PWEVj7xxEultCvkIi5lqBFB8fVuy3MpFIsJfgWnYGzdBoNGDsPMD+cZakYz56ct2ASUxAOI5jv9WWQ/xmwXuQYodZDRfpNGm1WvCYz0Oz2YShVx0F5lkAWzT0ZzgcVgb+i9vtprvxTYpPH/QIkXs1DmywZ80KafUPqLlpuD9/6o6GyJAAWrZotwM2nq/XmQEoYDPr4LI4AaENLRNCXu5e/wQkrxGr1QqCIDDXMIYTVCqV5FwUfBcMkMlkiKICdNDpdLKbsQoJnDSzyQRvlYpCCFFscNqNhinIVbVs7/F4WN9QcNRhhEgzpOsU4Lb4BeWPbzlJ6umogxKkv/HjEkcD8AvPystqOhpuUwAAAABJRU5ErkJggg==";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["NONE"];
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        function $$CustomItem() {
            $$itemSuper(this);
              this.$maxStackSize = (1);this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabTools);;
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            ($$player).$setItemInUse($$itemstack,32);
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            ;
        }
        $$CustomItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$getItemAttributeModifiers = function () {
            __efb2_arg_attribute_map = $$itemGetAttributes.apply(this, []);
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", 9);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 40);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("sticky_piston_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("sticky_piston_sword"), ModAPI.util.str("sticky_piston_sword"), $$custom_item);
            ModAPI.items["sticky_piston_sword"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("sticky_piston_sword"));
        });
        AsyncSink.L10N.set("item.sticky_piston_sword.name", "Sticky Piston Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/sticky_piston_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/sticky_piston_sword"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 0.55, 0.55, 0.55 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.7, 1.7, 1.7 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/sticky_piston_sword.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();(function CraftingRecipeDatablock() {
    function $$registerRecipe() {
        function $$internalRegister() {
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function $$ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
            var $$resultItemArg = "item/sticky_piston_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "sticky_piston",
                meta: 0
            },"B": {
                type: "item",
                id: "stick",
                
            },
            };
            var $$recipePattern = [
                "A","A","B",
            ];
            var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            var $$recipeInternal = [];
            Object.keys($$recipeLegend).forEach(($$key) => {
                $$recipeInternal.push($$ToChar($$key));
                var $$ingredient = ($$recipeLegend[$$key].type === "block" ? $$itemStackFromBlockWithMeta(ModAPI.blocks[$$recipeLegend[$$key].id].getRef(),1,$$recipeLegend[$$key].meta) : ModAPI.items[$$recipeLegend[$$key].id].getRef());
                $$recipeInternal.push($$ingredient);
            });

            var $$recipeContents = $$recipePattern.map(row => ModAPI.util.str(row));
            var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal));

            var $$resultItem = $$resultItemArg.startsWith("block/") ?
                ($$itemStackFromBlockWithMeta(ModAPI.blocks[$$resultItemArg.replace("block/", "").split("@")[0]].getRef(),1,$$resultItemArg.replace("block/", "").split("@")[1] || 0))
                : ($$itemStackFromItem(ModAPI.items[$$resultItemArg.replace("item/", "")].getRef(), 1));
            
            (function ($$itemstack) {})($$resultItem);
            
            var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
            
        }

        if (ModAPI.items) {
            $$internalRegister();
        } else {
            ModAPI.addEventListener("bootstrap", $$internalRegister);
        }
    }
    ModAPI.dedicatedServer.appendCode($$registerRecipe);
    $$registerRecipe();
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAHRSURBVChTlZIxSEJBGMf/Vy3RIA2Si0YR1IPiQURlhC0ORksWTm4tSS02WUtDoBAEuTQ01OZilEG0CUWLlBoJDRIVlESERfi0LXn5Xd7rPZ4U/YZ7d9/733d33/+DgVmvV61Pa4TDYd2qTiQS+Q72OdrUQCBgVKzOjfAAo4GylcpljDnKaJJlWbV2dKBYLGJt95xhctiqUpCUBN+iZ366X5V7rLj5lBGNRpkmoHsVCgWkUimMdlV5zOVbQROf1YjH4/VZLa1tHNuH18zv9zN+I/2ZfxIMBg1i7QjBzICCs505c0Z9KWOxmCpEWmWoGBaLBZ3VCyxsnLDEpk/dOn5HCwkIu93Ovw/KcG08gXdpj2/md9hPJJiiKLjMZFAqlWB61fp8Lw+QRaafoVDIGPgvbrdbzWaz/FXCcz0mMxtBBnsmJDhcy8jn80in09xo+mdKQCUbHBoCGV98eeEFEB1ycNWMxal2PD+9ol/qQuzo4ieBqDUhSRIqlQqvGsWog3K5nKalhHcVG5LJ5E+7EVRBp9PJT6ZbCKjTerq7cXt/b0hEGBbU7Z22VqQe2vna4/Fw3yhho80EEz1krWZxevWG/OOHJhKeNtooYHrjfxM2BvgCiKLOr/9+UHYAAAAASUVORK5CYII=";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["NONE"];
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        function $$CustomItem() {
            $$itemSuper(this);
              this.$maxStackSize = (1);this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabTools);;
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            ($$player).$setItemInUse($$itemstack,32);
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            ;
        }
        $$CustomItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$getItemAttributeModifiers = function () {
            __efb2_arg_attribute_map = $$itemGetAttributes.apply(this, []);
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", 9);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 40);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("piston_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("piston_sword"), ModAPI.util.str("piston_sword"), $$custom_item);
            ModAPI.items["piston_sword"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("piston_sword"));
        });
        AsyncSink.L10N.set("item.piston_sword.name", "Piston Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/piston_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/piston_sword"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 0.55, 0.55, 0.55 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.7, 1.7, 1.7 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/piston_sword.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();(function CraftingRecipeDatablock() {
    function $$registerRecipe() {
        function $$internalRegister() {
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function $$ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
            var $$resultItemArg = "item/piston_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "piston",
                meta: 0
            },"B": {
                type: "item",
                id: "stick",
                
            },
            };
            var $$recipePattern = [
                "A","A","B",
            ];
            var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            var $$recipeInternal = [];
            Object.keys($$recipeLegend).forEach(($$key) => {
                $$recipeInternal.push($$ToChar($$key));
                var $$ingredient = ($$recipeLegend[$$key].type === "block" ? $$itemStackFromBlockWithMeta(ModAPI.blocks[$$recipeLegend[$$key].id].getRef(),1,$$recipeLegend[$$key].meta) : ModAPI.items[$$recipeLegend[$$key].id].getRef());
                $$recipeInternal.push($$ingredient);
            });

            var $$recipeContents = $$recipePattern.map(row => ModAPI.util.str(row));
            var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal));

            var $$resultItem = $$resultItemArg.startsWith("block/") ?
                ($$itemStackFromBlockWithMeta(ModAPI.blocks[$$resultItemArg.replace("block/", "").split("@")[0]].getRef(),1,$$resultItemArg.replace("block/", "").split("@")[1] || 0))
                : ($$itemStackFromItem(ModAPI.items[$$resultItemArg.replace("item/", "")].getRef(), 1));
            
            (function ($$itemstack) {})($$resultItem);
            
            var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
            
        }

        if (ModAPI.items) {
            $$internalRegister();
        } else {
            ModAPI.addEventListener("bootstrap", $$internalRegister);
        }
    }
    ModAPI.dedicatedServer.appendCode($$registerRecipe);
    $$registerRecipe();
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAFNSURBVChTY0ABGzuD/0OZUJDtov2fEcpGlQbJQJmYAKzl2tG1/z/cPcJw6fRdsCBY/4xcP4g2TzPR/3jNAAGo6v8gnXBngABIQlKGlUHVJorh0IqFDJevQ+0AGQmyGERjGA+yU0OOG7+d+ACKG0AA5A49U2Uwe+miXQxMYBYQgFwMcgdIEh4AQIBiwrFFhf8FlG0YYKGUMXkTI9wEWEghS4L4KGELshMEpu65iuq2DD85cKhBuaigM10dbxhgeBMfQLbl+ZPfYHfiNACmGKQQFjSw8AOB188fMezafYOBGcpHAaAQMfKKZWD+/ZFBXFoIrBjE//H+EZh998YbhuMnb4MDAx6M6AAUaiDFIABKPbDgBbkIlIpgIQn3AiypgQDM2SADQGwQgCU99ChA4YCSYnScG9x/GPGFC4CSLCi6YMkWa7rGBUCayE/vDAwAiy/GT7bdUyEAAAAASUVORK5CYII=";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["NONE"];
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        function $$CustomItem() {
            $$itemSuper(this);
              this.$maxStackSize = (1);this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabTools);;
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            ($$player).$setItemInUse($$itemstack,32);
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            ;
        }
        $$CustomItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$getItemAttributeModifiers = function () {
            __efb2_arg_attribute_map = $$itemGetAttributes.apply(this, []);
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", 3);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 5);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("fish_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("fish_sword"), ModAPI.util.str("fish_sword"), $$custom_item);
            ModAPI.items["fish_sword"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("fish_sword"));
        });
        AsyncSink.L10N.set("item.fish_sword.name", "Fish Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/fish_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/fish_sword"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 0.55, 0.55, 0.55 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.7, 1.7, 1.7 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/fish_sword.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();(function CraftingRecipeDatablock() {
    function $$registerRecipe() {
        function $$internalRegister() {
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function $$ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
            var $$resultItemArg = "item/fish_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "cooked_fish",
                
            },"B": {
                type: "item",
                id: "stick",
                
            },
            };
            var $$recipePattern = [
                "A","A","B",
            ];
            var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            var $$recipeInternal = [];
            Object.keys($$recipeLegend).forEach(($$key) => {
                $$recipeInternal.push($$ToChar($$key));
                var $$ingredient = ($$recipeLegend[$$key].type === "block" ? $$itemStackFromBlockWithMeta(ModAPI.blocks[$$recipeLegend[$$key].id].getRef(),1,$$recipeLegend[$$key].meta) : ModAPI.items[$$recipeLegend[$$key].id].getRef());
                $$recipeInternal.push($$ingredient);
            });

            var $$recipeContents = $$recipePattern.map(row => ModAPI.util.str(row));
            var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal));

            var $$resultItem = $$resultItemArg.startsWith("block/") ?
                ($$itemStackFromBlockWithMeta(ModAPI.blocks[$$resultItemArg.replace("block/", "").split("@")[0]].getRef(),1,$$resultItemArg.replace("block/", "").split("@")[1] || 0))
                : ($$itemStackFromItem(ModAPI.items[$$resultItemArg.replace("item/", "")].getRef(), 1));
            
            (function ($$itemstack) {})($$resultItem);
            
            var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
            
        }

        if (ModAPI.items) {
            $$internalRegister();
        } else {
            ModAPI.addEventListener("bootstrap", $$internalRegister);
        }
    }
    ModAPI.dedicatedServer.appendCode($$registerRecipe);
    $$registerRecipe();
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAFfKj/FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkUExURQAAAM3Gi/b6vcW+i97mpO72tNXalEk2FWhOHolnJygeCwAAAGFVi5MAAAAMdFJOU///////////////ABLfzs4AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB1SURBVBhXNY5ZAgAxBEMF7Szuf99J6ORDnqXKqqyWYhJK+KIJDK4me1dorOVuBc6pzCEiAew3jEFv5RkNdLbQLgi5hne/s3oqurKVCo634D5rRvB0rTtius42bH6xJp0dyNwnncJ1B/5jeTbuV9CfUxY/tao+lVQIdzF34HkAAAAASUVORK5CYII=";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["NONE"];
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        function $$CustomItem() {
            $$itemSuper(this);
              this.$maxStackSize = (1);this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabTools);;
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            ($$player).$setItemInUse($$itemstack,32);
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            ;
        }
        $$CustomItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$getItemAttributeModifiers = function () {
            __efb2_arg_attribute_map = $$itemGetAttributes.apply(this, []);
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", 9);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 40);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("end_stone_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("end_stone_sword"), ModAPI.util.str("end_stone_sword"), $$custom_item);
            ModAPI.items["end_stone_sword"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("end_stone_sword"));
        });
        AsyncSink.L10N.set("item.end_stone_sword.name", "End Stone Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/end_stone_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/end_stone_sword"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 0.55, 0.55, 0.55 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.7, 1.7, 1.7 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/end_stone_sword.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();(function CraftingRecipeDatablock() {
    function $$registerRecipe() {
        function $$internalRegister() {
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function $$ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
            var $$resultItemArg = "item/end_stone_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "end_stone",
                meta: 0
            },"B": {
                type: "item",
                id: "stick",
                
            },
            };
            var $$recipePattern = [
                "A","A","B",
            ];
            var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            var $$recipeInternal = [];
            Object.keys($$recipeLegend).forEach(($$key) => {
                $$recipeInternal.push($$ToChar($$key));
                var $$ingredient = ($$recipeLegend[$$key].type === "block" ? $$itemStackFromBlockWithMeta(ModAPI.blocks[$$recipeLegend[$$key].id].getRef(),1,$$recipeLegend[$$key].meta) : ModAPI.items[$$recipeLegend[$$key].id].getRef());
                $$recipeInternal.push($$ingredient);
            });

            var $$recipeContents = $$recipePattern.map(row => ModAPI.util.str(row));
            var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal));

            var $$resultItem = $$resultItemArg.startsWith("block/") ?
                ($$itemStackFromBlockWithMeta(ModAPI.blocks[$$resultItemArg.replace("block/", "").split("@")[0]].getRef(),1,$$resultItemArg.replace("block/", "").split("@")[1] || 0))
                : ($$itemStackFromItem(ModAPI.items[$$resultItemArg.replace("item/", "")].getRef(), 1));
            
            (function ($$itemstack) {})($$resultItem);
            
            var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
            
        }

        if (ModAPI.items) {
            $$internalRegister();
        } else {
            ModAPI.addEventListener("bootstrap", $$internalRegister);
        }
    }
    ModAPI.dedicatedServer.appendCode($$registerRecipe);
    $$registerRecipe();
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/gif;base64,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";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["NONE"];
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        function $$CustomItem() {
            $$itemSuper(this);
              this.$maxStackSize = (1);this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabTools);;
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            ($$player).$setItemInUse($$itemstack,32);
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            ;
        }
        $$CustomItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$getItemAttributeModifiers = function () {
            __efb2_arg_attribute_map = $$itemGetAttributes.apply(this, []);
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", 13);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 100);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("rainbow_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("rainbow_sword"), ModAPI.util.str("rainbow_sword"), $$custom_item);
            ModAPI.items["rainbow_sword"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("rainbow_sword"));
        });
        AsyncSink.L10N.set("item.rainbow_sword.name", "Rainbow Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/rainbow_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/rainbow_sword"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 0.55, 0.55, 0.55 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.7, 1.7, 1.7 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/rainbow_sword.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();(function CraftingRecipeDatablock() {
    function $$registerRecipe() {
        function $$internalRegister() {
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function $$ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
            var $$resultItemArg = "item/rainbow_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "wool",
                meta: 6
            },"B": {
                type: "block",
                id: "wool",
                meta: 14
            },"C": {
                type: "block",
                id: "wool",
                meta: 1
            },"D": {
                type: "block",
                id: "wool",
                meta: 10
            },"E": {
                type: "item",
                id: "wooden_sword",
                
            },"F": {
                type: "block",
                id: "wool",
                meta: 4
            },"G": {
                type: "block",
                id: "wool",
                meta: 11
            },"H": {
                type: "block",
                id: "wool",
                meta: 5
            },"I": {
                type: "block",
                id: "wool",
                meta: 13
            },
            };
            var $$recipePattern = [
                "ABC","DEF","GHI",
            ];
            var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            var $$recipeInternal = [];
            Object.keys($$recipeLegend).forEach(($$key) => {
                $$recipeInternal.push($$ToChar($$key));
                var $$ingredient = ($$recipeLegend[$$key].type === "block" ? $$itemStackFromBlockWithMeta(ModAPI.blocks[$$recipeLegend[$$key].id].getRef(),1,$$recipeLegend[$$key].meta) : ModAPI.items[$$recipeLegend[$$key].id].getRef());
                $$recipeInternal.push($$ingredient);
            });

            var $$recipeContents = $$recipePattern.map(row => ModAPI.util.str(row));
            var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal));

            var $$resultItem = $$resultItemArg.startsWith("block/") ?
                ($$itemStackFromBlockWithMeta(ModAPI.blocks[$$resultItemArg.replace("block/", "").split("@")[0]].getRef(),1,$$resultItemArg.replace("block/", "").split("@")[1] || 0))
                : ($$itemStackFromItem(ModAPI.items[$$resultItemArg.replace("item/", "")].getRef(), 1));
            
            (function ($$itemstack) {})($$resultItem);
            
            var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
            
        }

        if (ModAPI.items) {
            $$internalRegister();
        } else {
            ModAPI.addEventListener("bootstrap", $$internalRegister);
        }
    }
    ModAPI.dedicatedServer.appendCode($$registerRecipe);
    $$registerRecipe();
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGmSURBVChTjVI9T8JQFL0PQwXREEpIiAODDELioA5OYhzKYGLUiIHB1cGEBUd/gav/wOiqOLi4O0qibBAVTVAJQorEyEcw9tr7oE2xRTlJ+97rfef0vPMu9KGaiWJvqiK1PspXjF6JiKBsT7sgvGTjawgFXLgZshv2W+FNjuOW6ETi48qCD+9PvF1RWjg/6sAYw3Su01O1wMWORwlFWLe+t+FQYmEBq9cSfiuvSI65vgpdgaSfyk2Y+VTgYaQF2WqvJkkS+v1+3fP//ocBGSQ/mg8dVLg7FpFCUOf9RTpFRS0oWNJD0UHR0wYq0GOSJuyuBXDWB4OLNMYXBa7EP2pIJpNmhgED7+Iv0GlpPDlvDyegEehyPeF5qOdvYT/VhLNay8ynRKgH1cPysClTaoBKLcGb4HdKuoLaMViSFUQENullkIyNg3tV4jVboQbvuRvIXSnctvHPfRa0BJsTblieEyFzWoSDwzFLooa+D9SSRDy6fAFHuwFToh0e5S8IegVI5zsmMoFRu9IkGnzmxHyxoW8kRwW5A9nK4LCZsdfL5fLAjdYA+AE5ptSq/3tWhgAAAABJRU5ErkJggg==";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["NONE"];
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        function $$CustomItem() {
            $$itemSuper(this);
              this.$maxStackSize = (1);this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabTools);;
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function ($$itemstack, $$world, $$player) {
            ($$player).$setItemInUse($$itemstack,32);
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            ;
        }
        $$CustomItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$getItemAttributeModifiers = function () {
            __efb2_arg_attribute_map = $$itemGetAttributes.apply(this, []);
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", (-1));efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 1);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("golden_carrot_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("golden_carrot_sword"), ModAPI.util.str("golden_carrot_sword"), $$custom_item);
            ModAPI.items["golden_carrot_sword"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("golden_carrot_sword"));
        });
        AsyncSink.L10N.set("item.golden_carrot_sword.name", "Golden Carrot Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/golden_carrot_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/golden_carrot_sword"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 0.55, 0.55, 0.55 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.7, 1.7, 1.7 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/golden_carrot_sword.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();(function CraftingRecipeDatablock() {
    function $$registerRecipe() {
        function $$internalRegister() {
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function $$ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
            var $$resultItemArg = "item/golden_carrot_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "golden_carrot",
                
            },"B": {
                type: "item",
                id: "stick",
                
            },
            };
            var $$recipePattern = [
                "A","A","B",
            ];
            var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            var $$recipeInternal = [];
            Object.keys($$recipeLegend).forEach(($$key) => {
                $$recipeInternal.push($$ToChar($$key));
                var $$ingredient = ($$recipeLegend[$$key].type === "block" ? $$itemStackFromBlockWithMeta(ModAPI.blocks[$$recipeLegend[$$key].id].getRef(),1,$$recipeLegend[$$key].meta) : ModAPI.items[$$recipeLegend[$$key].id].getRef());
                $$recipeInternal.push($$ingredient);
            });

            var $$recipeContents = $$recipePattern.map(row => ModAPI.util.str(row));
            var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal));

            var $$resultItem = $$resultItemArg.startsWith("block/") ?
                ($$itemStackFromBlockWithMeta(ModAPI.blocks[$$resultItemArg.replace("block/", "").split("@")[0]].getRef(),1,$$resultItemArg.replace("block/", "").split("@")[1] || 0))
                : ($$itemStackFromItem(ModAPI.items[$$resultItemArg.replace("item/", "")].getRef(), 1));
            
            (function ($$itemstack) {})($$resultItem);
            
            var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
            
        }

        if (ModAPI.items) {
            $$internalRegister();
        } else {
            ModAPI.addEventListener("bootstrap", $$internalRegister);
        }
    }
    ModAPI.dedicatedServer.appendCode($$registerRecipe);
    $$registerRecipe();
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAEoSURBVDhPY2QgAdguOvv/cJwxI4iGCjGQbACIPhRrBOYb1M9nYAKzCABkG0Gagw7dg/KwgP//4WrhAGQACINA4MG7YFq/bh5YIYoLkG0CAWw2S8uIgp0OAjBD4ACbAcg259z9BLcZBuAuQNcMA/rWqnCbDy9cAxFDtxkEQAaAbIAZBOPjshkGsMYCSDPI5h9v3hK0GZ4OgN5ksFt87r+6uhCY/+bdRwYZNSWw5otNSTjTC4oEzBBhUWaGt6//Mny6cxGvZhBA8YKXudh/7TWBDPePn4OKQJwNMhgEQDQMwwDcdE8z0f8OhkIM87c/Ybjx6CsjSCOfij5YDuQSGEB3ETxjgGw+cOEtWDNYBgiQAw2XV8AGgPwMcjYh/2IDTCDnIfuZNMDAAADfbshTx9U9ogAAAABJRU5ErkJggg==";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["NONE"];
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        function $$CustomItem() {
            $$itemSuper(this);
              this.$maxStackSize = (1);this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabTools);;
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function (__efb2_arg_itemstack, __efb2_arg_world, __efb2_arg_player) {
            (__efb2_arg_player).$setItemInUse(__efb2_arg_itemstack,32);
            var __efb2_arg_itemstack,__efb2_arg_world,__efb2_arg_player;  efb2__executeCommand(__efb2_arg_world, (efb2__makeVec3(((((__efb2_arg_player).$getLook(1)))["$xCoord"]),((((__efb2_arg_player).$getLook(1)))["$yCoord"]),((((__efb2_arg_player).$getLook(1)))["$zCoord"]))), '/summon LightningBolt ~ ~ ~', false);;
            return (__efb2_arg_itemstack);
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return 32;
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function ($$itemstack, $$world, $$player) {
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onUpdate = function ($$itemstack, $$world, $$player, $$hotbar_slot, $$is_held) {
            $$is_held = ($$is_held) ? true : false;
            ;
            return ($$itemstack);
        }
        $$CustomItem.prototype.$onItemUse0 = function ($$itemstack, $$player, $$world, $$blockpos) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function ($$itemstack, $$world, $$player) {
            ;
        }
        $$CustomItem.prototype.$onBlockDestroyed = function ($$itemstack, $$world, $$block, $$blockpos, $$entity) {
            ;
            return 0;
        }
        $$CustomItem.prototype.$getItemAttributeModifiers = function () {
            __efb2_arg_attribute_map = $$itemGetAttributes.apply(this, []);
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", 17);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 2048);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("custom_item")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("custom_item"), ModAPI.util.str("custom_item"), $$custom_item);
            ModAPI.items["custom_item"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("custom_item"));
        });
        AsyncSink.L10N.set("item.custom_item.name", "Lightning Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/custom_item.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/custom_item"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 0.55, 0.55, 0.55 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.7, 1.7, 1.7 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/custom_item.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();
})();
