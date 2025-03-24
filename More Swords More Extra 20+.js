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
    ModAPI.meta.title("More Swords More Extra 20+");
    ModAPI.meta.version("V1.0");
    ModAPI.meta.description("More swords");
    ModAPI.meta.credits("By Death");
})();
(function IconDatablock() {
    ModAPI.meta.icon("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAARlJREFUOE9jZCAD/JnG8B+mjZFU/SDNzJktYG1/p9cwkGQAQrMzAwPDXtIMAGu212D4e/AGA8gFINtZshgYiXLB/kSB/w4lEgwHel4wgGiQISDNIG8QNKDbhPF/YdJ/hv55jAwg+vBpAQbH+R/g+vAaANJsosvPcObyRwYYXXrmP4oenAZ4CrH8d1L6y7DvHjNDmT8PQ9fGLwzb3/3BUA8XMJCQgcctyG+Sv16AowpmCDbNKGEAMoCPjYOBl4eL4fKzpwzaTB/hSQSXZoxABBkiLSTE8PnLN4YHn96DDXj04S3ecEKRRHYFSDPIJUQbANMMs1mBTxDsCoIGwAIP5H9kDXICwuBAJcoAkL+JcS62jAcOA2Jtw2YAANFDgMTa7Yh+AAAAAElFTkSuQmCC");
})();(function ItemDatablock() {
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAF3SURBVChThZK/S8NAFMffdVIqLipoFbsICiGjFXUQIg5OrhFcgzgZcPYPECf/B5Fsbi4iuCgBFyUEiqCo6FC1i21BpzPfl1yaM2n9LHff9+veuzvS2J03JG/CMJTiZGNFnj0+sYHZMqvS87w4ZG66LNN4BQxphBIoxgaIw9VaLNZrYxIFWUSIZE1B+uLefqIS1InojQ0RKJutRK7rstCMANk5439oI/wF4ygn1hJbE9Dkm7lEhmEIOIMgiMdUUzS/23QcPAs0LK/O6egmFGkFzD4yMMTBk8E1OxNXF8uychNxhYPtWTZWPh6w6GRvr4j8OQWgL7G8Ro7jsMZ0tm0L3FffAkhcqIxSaXOHTNPUEqFBzwIqGR8TVwebSkQh3/fp8+K0WwAJU8Nlev3qsMb+7r2RJsPPjgj1HthrHSAI74E2ofFgeBOAYkAlKjSB314dH6T79gxrs9XQTitCqNZ+Jlp0eduk+ktHC1YP36uIyP6MficVQ/QLuILSIec2K60AAAAASUVORK5CYII=";

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
                ModAPI.util.str("shear_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("shear_sword"), ModAPI.util.str("shear_sword"), $$custom_item);
            ModAPI.items["shear_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("shear_sword"));
        });
        AsyncSink.L10N.set("item.shear_sword.name", "Shear Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/shear_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/shear_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/shear_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/shear_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "shears",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEPSURBVChTnVK7DoIwFL046mZiAolxMuLqYuJCHFj8Ege+xB9g9TMcWIQvcGAojsYBBkfnmlPbIqWI8STa+zrn3vZCDTDGuDDCMOTvPxO6ZDkbcWuF67p8IG3arSd1BbjICgcZ7XQBDcACdECdABRaKpDGeK0EWL09bbBeVAFzpGnarYwkIN1aTjFFUEI/HZJZllEQBDJi4LD3UWPviSRO6wNFUWRn/QO1CuDrM5hQRCwYRLXoXgEQ8UMh7oldm0RHnqLY930qikL4SZIIu6oq8bSe51FZlrreCojEcczxZf06akMRxO1qTMfTnaaLDeV5LuLfOjvoCmM+vNL58iB2ezaKVfcuEedzvN47tkD0ApPyztSjCtuSAAAAAElFTkSuQmCC";

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
        $$CustomItem.prototype.$getStrVsBlock = function (__efb2_arg_itemstack, __efb2_arg_block) {
            var __efb2_arg_itemstack,__efb2_arg_block;  if (((ModAPI.reflect.getClassByName("ItemSpade").staticVariables.EFFECTIVE_ON?.$backingMap?.$elementData?.data?.filter(x => !!x)?.map(x => x.$key) || [])).includes(__efb2_arg_block)) {
    return 5;}
;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("shovel_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("shovel_sword"), ModAPI.util.str("shovel_sword"), $$custom_item);
            ModAPI.items["shovel_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("shovel_sword"));
        });
        AsyncSink.L10N.set("item.shovel_sword.name", "Shovel Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/shovel_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/shovel_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/shovel_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/shovel_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "iron_shovel",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG1SURBVChTjZLPSwJREMdHkYQKlI2CgpYNpY0O4SE9BJ48RBEFXvsDqv/A/gM9eA4E8ZLhpVt1kw5CB73sKbSMhKAgyB9BhR3a9jvrW5+p0Oewb957M7Mz33kEwuGwyUahULAN4KpWq6ZhGOTCDj6+jQvq3OyQm+8t4vo5VSoVdmAPkckDw1zNU6v9bm3X7ZDT4x/aC5zBJLeICwaDfOD8pblwQkvaIrXbHfrudmlby1MymXR52M3iMjVtfVuE2srlMqmqnYH/4ZQjkcvletYfUgd6v18LJ1L0AeSMbCQSCfOqsU8TXi8X+PHVJeX5iB25hmKxyId+v4+dcCngDFAWKzpoNptUr9epVCr1M+BC13WYQ7BDOp2mWq3GBwAqikIdHZAFIP1YDbYiswMaAKdfILSIxWK81zSNV0E2m+V1SCcgD3RuZpLPXt8+ebjLgXm6e3hhmR4bT46G8HGGDTBww7jmpgXwur+117VolOKbQatHvmIGEoBQKMSvBaoJYYT2QFEUXgWsoiCTyfSs8SCZjFNBryczEonYBz3kAMwPIxopooz8MmXkwH9xuKuaK+rUyGQ2RL8mzsIdDcoZiwAAAABJRU5ErkJggg==";

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
                ModAPI.util.str("water_bucket_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("water_bucket_sword"), ModAPI.util.str("water_bucket_sword"), $$custom_item);
            ModAPI.items["water_bucket_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("water_bucket_sword"));
        });
        AsyncSink.L10N.set("item.water_bucket_sword.name", "Water Bucket Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/water_bucket_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/water_bucket_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/water_bucket_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/water_bucket_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "water_bucket",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAG5SURBVChTjZI/SEJRFMaPFtE/h4R6Deb04BkYCOWDIGoTkgo3l/YSosmhIXCpIVCCBiMXt3ApolFaQlzUQXJIwc2IHDLI2oLX+47vPp9/gn6D59xz7/285zuPgN/v1zjJZDKdBNiq1apWLpfJhlVs3attj/9QIXTIu3wpmUx2z6NgKiFpxDe0l6ddLtjx8711RW/RElKyF4tFFhaCvMC1y5k2zcdXSMs2eKNCaxSMntpYAkxf3NHX2DHlXRFqZpv06VriOh8QsoJrb5ASiYSx6uNsT+m+X8e8afah069I6dgR9yX6KwU8ZuP8holFH/dpCyxg2QNLwVlEuNtqtaher1Mul+O/YgVsKIqCdAA+gJZqtRoXgCzL5kNNH6ACIJ9OpzkfYFOd7fEA9PQrWrsNT9JDe5UkxwjX57I3HCMfDo5Wn8xEDFQKSGwHhipsETki5gghITLKJwww8Lzey/PBSadw/84B36Okx/PXZZJDsj6Zbo89AsDn81H4scKuCWMKhvfA6XRyFLCLglQqZWR/g0FaMV9g9KSpqtopGFgvYH4Y0VATrVi/TCvWi/9if8etedxTQ8U6EP0Co/zGY0PMBMAAAAAASUVORK5CYII=";

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
                ModAPI.util.str("lava_bucket_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("lava_bucket_sword"), ModAPI.util.str("lava_bucket_sword"), $$custom_item);
            ModAPI.items["lava_bucket_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("lava_bucket_sword"));
        });
        AsyncSink.L10N.set("item.lava_bucket_sword.name", "Lava Bucket Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/lava_bucket_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/lava_bucket_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/lava_bucket_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/lava_bucket_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "lava_bucket",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIMSURBVChTjZPNi1JRGMYfmwRB8QMLLhbDFFIJza6ZRQotZSZGWpSbYRAhSEcomo3b2UmrcDXzDwy5lCEm3BV2XU/MYqbVRKUbE5SQQHFO93nvvSe1Fv3gyjnvec/79RxBUsmkkkUkErEXtCwotaf8/gdiEEutVlPa5c6iX288YrF4lMmoH70eLnFTr9fVp5MT3F1etu8TGunlWVu9qn56b8m1j6bp0TEIPYxYDI1GA+l0GqFQ6M8Bs/JjKLekQqFgl0XoJLyGKpfLkk8f6GYt9IHDTA3EdWBPV6JRuy8X5mZ/H5pNrK2vi21Bfi1M01RvDg4wmUzQ7XbRarUQCARsh2q1qh5/f4Jv15/i13AIr9eL8XiMm0tLchnNrWtW+XvSASNtbW5Kq/apAw/VGaR/Ojlmm1fPbovBnYEYXUql0qxhjr/mMA1nQm0SiQQ6nQ4Gg4HWJxgM4t3RES7Lbg5O/obV4cONDRSLRcdqEw6HRWgGIHqOhBmL29u7uVwO91ZWMBqNMLHG9XJnB1/Oz2V0/X4f7XYb8XhcRipKMSObp0LPL17gfjSJi/0s8vk83lpl+nw+sKJKpSKJstksYlZrlHsGViBY4xZd+HHt6MOnSI3mH5SGr72QWVSGYeggFJna8TVMv0oXjxvNwDHeH/dw9nWoleGFZCqFz6enqB8e/lMxz3RU/sec5X8C/AYbLSAh1TlUfwAAAABJRU5ErkJggg==";

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
                ModAPI.util.str("furnace_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("furnace_sword"), ModAPI.util.str("furnace_sword"), $$custom_item);
            ModAPI.items["furnace_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("furnace_sword"));
        });
        AsyncSink.L10N.set("item.furnace_sword.name", "Furnace Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/furnace_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/furnace_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/furnace_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/furnace_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "furnace",
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFvSURBVChTY0ABJ6c3/ocygWB+dgQSDwrgSjTkuP9vmT0RU0V9mBtCEEXFlo5yBMfTTPR/vIMJXIARSmOAxwfW/794+xGEg2w4yDhUF0MBSNHK8hTsEsh2ogOcbgBpUhATYmCC8lEAyFQvcwOGB6/eQUWQAEgnKCB9TXXA1oJNgLkBpvPA1TsMm09fAVsPVgCyC2ynqBDDtfuPGBYeOIPptklJgXBjMUBnujpYAqQAw8sgnVAmdQDIBlA8gTByFBEEIMWgNAIKIpBmlGDCB2A2ainKMTC8fcaw7tQVBlmHQEZYMMKDC6Qw1MOZ4fS58wyNq3YxgsPc0ZrhwYPHDNwqugyrly7GGrwoAiBNpq7eDK8vHGf4/P0ng7mpAUPLvNXwSMMGULxw6sF5hi2be8Ex/fbLV4bXH78xCHFzQGWxA0ZwCgCmhJc/bjAcuPCW4cajryi2gQILZAjW1AEEcBc8fc6HoRkEQM7HpZmBgYEBAHbbvJ0eIbTQAAAAAElFTkSuQmCC";

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
                ModAPI.util.str("granite_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("granite_sword"), ModAPI.util.str("granite_sword"), $$custom_item);
            ModAPI.items["granite_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("granite_sword"));
        });
        AsyncSink.L10N.set("item.granite_sword.name", "Granite Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/granite_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/granite_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/granite_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/granite_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "stone",
                meta: 1
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFfSURBVChTY0AB06dP/w9lAkFnYx0SDwrgSjTkuP8XZWdiqkDRhsLZsG4dnMPkaSb6f8vatVAuAwMjlMYA0/r6/kuLiEA4yDaCnILVBSBBnBIp0dGYElCA0w0gTXwCfAxMUD4KAJlqZGwM5aEBkOtB/kZxD4wDMhYkiewmsBXiYqJgSVkVFYZDe3czzFm6FNNtoLDF6ZvOdHW4FRhhgTVmkQDOcMAFQLb4uruD2Zt37iTeAJDTQJ7l5RVgAEXywZPHGfqmTmckaADIRlU1ZQZ1XQOG5y9fMpw9cgQllOAMkEKf4GBwMIJMBtmoqqPHICkuDhb79OET1uBFEQAZAooLfX19hpuXLzDwiUky3L5yCWwgVAkGYIbSYCDO+aKB+csVhht3vzL8+fuXgZXhH8Pzpy8Yzl2+3AhVggHATgUxvj3eynDgwluGG4++otgGksflfBBgBDkbysapCDdgYAAAWk2rdJyjBhUAAAAASUVORK5CYII=";

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
                ModAPI.util.str("gravel_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("gravel_sword"), ModAPI.util.str("gravel_sword"), $$custom_item);
            ModAPI.items["gravel_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("gravel_sword"));
        });
        AsyncSink.L10N.set("item.gravel_sword.name", "Gravel Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/gravel_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/gravel_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/gravel_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/gravel_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "gravel",
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHaSURBVChTY0ABL5dG/4cyGRgYJ9c6/Q/TkGRgBPFAnJwQO4a5236DZRk05Lj/b1mQhFAPAmpqamABsBaQaQ+k4xm+b2uGCBwoswXLHr70hoHB00z0f3mKEVw/WAUIgGz6cPo5g7wkG8PNx78YXI1EwDqYQJIwG9NijRimnnnDoOgcxGAf7cxgqyeCMGFuV+B/cTFBMPvlq/cMMDZYN7KdBAHMPzAAt6LZQ/M/yM5Hrz+B+Q+f/2KQctJAKAD5VVNfjkEszJeBgSWc4dWyGIYtT7+h+kJMRxUuCQIgh4IVgADIaIuY2QwHy+3A/OsXH4F9A7cCZApIAASQvQsGnenqYCtA3sXw8qmt5XjDAG4FDIDiBMokCBSVFRCeQAb8T94y6P78DcagdAVjmzlXMOQ07QWzQWpAAKsBcqJ8DKAwBUW4X8cBBk6vWgb7zkMMl48fBAchSA6kBgTgBoBCCd2/r67cBtN5uYkMFnoyDMlerJC4gAKUYAYBkCH37z5gYDz/nIFPlA1sCyh+QOlTXZYNrAYkduUaMGUDgUKIJaoBoNQuL8HJwC8mwmBrYwAWO3zkAkPnnHMYgQ0DjLBksmXdHoYDF94y3Hj0FUUxLF5xGcKIHPH4bMIOGBgAeZHIHg962C0AAAAASUVORK5CYII=";

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
        AsyncSink.L10N.set("item.custom_item.name", "Item Frame Sword");
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
})();(function CraftingRecipeDatablock() {
    function $$registerRecipe() {
        function $$internalRegister() {
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function $$ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
            var $$resultItemArg = "item/custom_item";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "item_frame",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE5SURBVChTY0AB8zy1/kOZQNBprYrEgwK4Eg057v8h6mKYKkCCTFA2w/Vs5/8vv/6CcEB6bWUEIFo8zUQRHCBghNIoAGRWs4sulAcEMBtBNMg4VBdDAUgSphAFgASR7UQHWN0AAjDT4P5CBqBwKjKVZwD5E0MB2EpFAYYbb78yHH7yAWIDzDiQzmMxpihugpsAE0TRiQxAunH6pjNdHSwBUoChCGvMIgGc4YANwDwDi6e0jWeJNwCkGaTx/cdPDIL8fGDNIM/iNQDZRpBGUAjNv/wMLAcLKbgBIMWmIvwMp998ZFhz8xUjiO+lJMKgIcwN14gteFEEYIbAgCgfK4aN6ABFEJTa5SU4Ga6e+8Qgzs0GFgOlF1yaQQDsVBBDRJ2D4cCFtww3Hn1FUQyLV5wuQI54fDZhBwwMADnJmRLuqPuAAAAAAElFTkSuQmCC";

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
                ModAPI.util.str("leather_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("leather_sword"), ModAPI.util.str("leather_sword"), $$custom_item);
            ModAPI.items["leather_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("leather_sword"));
        });
        AsyncSink.L10N.set("item.leather_sword.name", "Leather Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/leather_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/leather_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/leather_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/leather_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "leather",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFjSURBVChTjZO/L0NRFMfPI4Q0IhISg2Coql8x1WLrIGk3A4NZ4m8x+SsYGDoSk8VkYfAjbQcRIxHRJlXheZ/zeq97X73wnd6953u+53vOuU88TK/lQv3Ibc2EwcbRkp4CvYpQ3svHYZCfzITQOscY5kJTOCyvD0j/a1Z6uCgUF/Wwv10JpLQyFtp6EWwVA9KzhV6pX3xK9aAWqIRbEW2ArPGqgOQSLbh0a/6JpJJ6MCCAB+obeASCzccP/cYgpb0uriotGRmak/Zw3RKtAmwUzg+vNXhz/CX3p9WfObGO1G52d2Y1AKGL5C3yF3TtIgkaoG1j3OyoE04XSCaCzESfPgsaNfDmmMTL260mkMj4EEJwdXNB5ktxqnVARfcZmdnjAiGACN+MGDBmrwWSzHOjGgnYhehO192PJ8BrnxoflJNW9D+Mxvz2U+AvNAFrtdh4l7PLZ7l7aHpkUzlNJNXa/yDyDd7Vsj8E2uGKAAAAAElFTkSuQmCC";

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
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", 3);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 1);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("lily_pad_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("lily_pad_sword"), ModAPI.util.str("lily_pad_sword"), $$custom_item);
            ModAPI.items["lily_pad_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("lily_pad_sword"));
        });
        AsyncSink.L10N.set("item.lily_pad_sword.name", "Lily Pad Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/lily_pad_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/lily_pad_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/lily_pad_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/lily_pad_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "waterlily",
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHcSURBVChThZPBixJxFMe/s0SkFkukaRJdXFtj3QwST9WyOiz1H9R6iC4r5EKwewm6FEHgqVME/QueunVREupulCRjEqtRpm4dTIVla9bvc2acccP9wMz8fu/33vu93/f3Bg5WkindGALK46c5/dLSRSicXU5clyXvuQA/QOSCR6fHeGYQisbEoDDT7z97YiTH+Dp98jjub27ic0UDbiV8eubBtu5yucchfJnYw7lj8XVeEQezQi4O+z0OEfSfwerq2iQD0/KbXLmG/mCIxtcmcs+eAKqq6oFAwFnzLLideSZibTFd4E5dQ/3Th3GRplYmpmZ0muNg415aDISnaH6p4W/vl8zFgTx6uCWLPF769h1Elq+IXRyev3gpk3+Kjmg0hh/dNqofy5MacplF/dX7E+J0/qwXpWLBKh7ZbHamBhPP/2C/AmI/vhhGOBJMB0xjtdQIh47kqGAq5PKcspJQxm/t7kRGQukoJxuQAfaH8tJ+Ix5H5u66qEmkYwmzRYwx28zrnUc+nxfHq4m4dBd/k2LpHVAB9o3iHRqw27VBEGpKxXIkLPd3M5mCz+dHp/MTb4oF8fteryEYCo81YLvSuODW8La8i2qjL0ntHWkPMEwWir3XW63WIYfZAAfAANDcz0R5jAAAAABJRU5ErkJggg==";

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
                ModAPI.util.str("minecart_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("minecart_sword"), ModAPI.util.str("minecart_sword"), $$custom_item);
            ModAPI.items["minecart_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("minecart_sword"));
        });
        AsyncSink.L10N.set("item.minecart_sword.name", "Minecart Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/minecart_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/minecart_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/minecart_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/minecart_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "minecart",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGDSURBVChTY8jwk/vPAAP///5DcBiXByv8d3wkCuF9fXbsP0yaESwCBL3OKv8fvf8C5aEDkPLLiroQE/ONJMD6UaywleX+D7IFymWAu+bqiTX/QRgsiAxAgmBjfjwCK4CbDwRgZ4Hs8dTmZ9h+9SMDiL767C9DxuJFDNxSVnBnYwCQO8AMTzNRTDuRANP9F9/gigg6coOiEYoD4QDkelhgvDA1xTRlR6w62IswRSAMlWJgAREgb223MmOQE+RhkBL4w/DsAws4ikDeZAIpKN57h/Hc688gJoMgFztYkYe5K5iPE8DDQUOO+39nuvp/QuGBC8CDGmRQoqcMg09iK5ivICfFwCUkA2bDACOHHO6oAQUNLO2BwhMcGsCQAYXrh+IocPBBlWIHoAQBMwCEQRpABoDEYDEI4kOVwwHcSSADoEx4cEcsPQQVYWD49u4J2EsgGjmVofgJZgjIABDAlmtAciDxiedegPXiDhQggEcVEsgyE2WYduo1w+HHX/HqJRIwMAAAvmb91XHLJDwAAAAASUVORK5CYII=";

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
                ModAPI.util.str("cake_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("cake_sword"), ModAPI.util.str("cake_sword"), $$custom_item);
            ModAPI.items["cake_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("cake_sword"));
        });
        AsyncSink.L10N.set("item.cake_sword.name", "Cake Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/cake_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/cake_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/cake_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/cake_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "cake",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAF7SURBVChTY4CDQFuV/1AmGmCE0gwbq8z+P371CayWB7d6IIBrqY1Q/3/l6d/vTCDOlBSN/69+sIquP3yHC7d9MAmQarAAFICNAAExYQ4wLSvGB6ZhGsCWgjgwBSCgK/KHYe/NPwxAOxkZPM1E/2vIcYNV43U/DIB8DGXiBukBOgJQJsKRQMH/IAxiA93wHsZmgjFevf3B4KUFCYecOTfgIcYI9QEnP/Pv79bq/Az+bafgkmAAMyErUBtMg/jogYViPwboTFcHS4CswqkIGwAqhsckvrCBBwMMgGwC4ZkbrvyD2QhMSuAIRHYBTB2GAaA4RY7XRx/+gxLApyA7lf+goARpAomD4hmE4YkBJgiyBaTQWZ0FnHIO3/nK0LPqKkrQgtSDEwoQgF0AshEmAHQ6I0gzCOy69J7h8y+IXpDByBaBBYEAFJH8QPoDzNkg22FskGFgBhJAth0EwAxQkpWX4GR4+Z4NrBlkCLIivCDDTw6e3tEBcqhjBwwMAEvatCrWJNGuAAAAAElFTkSuQmCC";

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
                ModAPI.util.str("dead_bush_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("dead_bush_sword"), ModAPI.util.str("dead_bush_sword"), $$custom_item);
            ModAPI.items["dead_bush_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("dead_bush_sword"));
        });
        AsyncSink.L10N.set("item.dead_bush_sword.name", "Dead Bush Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/dead_bush_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/dead_bush_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/dead_bush_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/dead_bush_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "deadbush",
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADSSURBVChTpZM9FoMgEIQxbWpa21BY5w5pco0EOIkX0NvYeAQPZDK4q6BLSF6+RvZnYNgnKmGappmWObquW1pMfS71Euuu85thGJbgdtVb8AnIQUVxgugYW8MnikkDgvUCv8C7nEIkMI5j+IoNUBtjKIpAAcAToPQGF5NbMJheVtk+LiEpjth7f0z+CzwW5yTBU8AMm6ZZh12EhTyIWJh1wCJu7vteaa2VtTbUs0CwPzEmPv0AfsnnvZ7xaiDeuxDhE1lI6a+pYJHWyjknvqA8Sr0A2frcDDHulrQAAAAASUVORK5CYII=";

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
                ModAPI.util.str("feather_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("feather_sword"), ModAPI.util.str("feather_sword"), $$custom_item);
            ModAPI.items["feather_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("feather_sword"));
        });
        AsyncSink.L10N.set("item.feather_sword.name", "Feather Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/feather_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/feather_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/feather_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/feather_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "feather",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGzSURBVChTfVJNLwNhEJ512W5LtdXKNiUcSkLcmvQgHNBEnMTd1UV/gN/gN7i6izvhIA6SJg4NUk0Imm6afin9Cs3yjM5rNxXPYWfeeWfmeebdIRcSWwu221GQCOwQnGbmAYYCYT9bBWRoazuLdr3c4EDmKKtpcOZX4rYR8HCQNpIRboggrMqAvTnLa8LYrncIVZwALG0n7LFYkO6vHvkcjY8TuFgWqqqFV3qvtvhyJjlNxXyJRVAqlbJN0+S2TgjtAOQCdn13+WdyzCZBtAdgy8Ua+6xhcy+lksQH1BS4wFjhaJArYZ9vi78JgFRWCjW6OMzwHX8gxjOi0/H+iXooAGOyyNVeST0QMDFr9r1vpNNpVfEXXBoAUPAL9gFdLzmLf/7pwSXHkQMWxDkgO4Bg563LU0oT5/TNRot8fi99fvRUM8UkzFIAYCNCsVHSDZ2GQ15mFGZAPQKAA5qgWNjhY4OwGDKGFKM5oBQ4ARWTc1H+UWgirCjCzvbTGK4Dtn3KNCjrj1C72VVKAKiTLXDGNawrnLg3R+fXFbp7ag6ogiIwy/sYPv13U5y7blnWQPH/IPoCk9fjydvSk14AAAAASUVORK5CYII=";

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
                ModAPI.util.str("fern_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("fern_sword"), ModAPI.util.str("fern_sword"), $$custom_item);
            ModAPI.items["fern_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("fern_sword"));
        });
        AsyncSink.L10N.set("item.fern_sword.name", "Fern Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/fern_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/fern_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/fern_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/fern_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "tallgrass",
                meta: 2
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC1SURBVChTY0ABGnLc/6FMXODGjRsQJTjVuri4ICQ8zURxcI4dO4ainxFKY4D/QABlogKQcVhdgVPC3t7+PwhDuRgApxtQ/IQOQJL79u37LyEhgV0RXsnOdHXcRpMn+eDBA+z+hwImEHHj0Vec3iUZgIIABnD6FBuAaQQFEQiQpBkUzyCNIL+SrBEUevgCCSsgRSNK6II0yktwMhy48Jb4kAfFIyibgGh8yRYvAGkkKXDggIEBAKWvdxD7FjWdAAAAAElFTkSuQmCC";

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
                ModAPI.util.str("arrow_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("arrow_sword"), ModAPI.util.str("arrow_sword"), $$custom_item);
            ModAPI.items["arrow_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("arrow_sword"));
        });
        AsyncSink.L10N.set("item.arrow_sword.name", "Arrow Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/arrow_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/arrow_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/arrow_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/arrow_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "arrow",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFo9M/3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAEpSURBVChTY0AB2qcP/AczLrx6+Z/BWj0EzGMECwEBSHT+z88QjoYcN0QtOgCpgmuZ8+nt//fnH0B5QFC9bjtEm6eZ6H84BxcAmQVzFBNYBApWXLj5P//xnf9nOFgYEr7xQkWhoPvg2f8gx4NoqBAEgIzDZyfc2egApPHGsw+obkAG0eePMzz++AXKQwNH/v/D7U2skiDvJXnX/tfeuQG3TnU52/8gDOWigs50dbAEwSCmGIDCBsoEA5DbcYYTMoBpBCUpUFzCIvryvXsgCjcA2QCiQYnr3f///0E0iI8R38gAZBvMRpBNIBtBGMQnGEggG0FBDUpVoHiBChMfuqDUnuEnB06SsHgjKvWDMEgjzuyGBzCBkuzu608YhBNmMtx49BVn8sYOGBgAZdPF3rraUSAAAAAASUVORK5CYII=";

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
            var __efb2_arg_attribute_map,multiply;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", multiply);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 30);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("beacon_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("beacon_sword"), ModAPI.util.str("beacon_sword"), $$custom_item);
            ModAPI.items["beacon_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("beacon_sword"));
        });
        AsyncSink.L10N.set("item.beacon_sword.name", "Beacon Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/beacon_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/beacon_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/beacon_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/beacon_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "beacon",
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEHSURBVDhPY2QgA/CYG/yHMkkHIM09Xx6BMbOawn8mqDhRAKS5Ye8mhgU3z0NFSAAwm3XOboTbDpUiDJA1q7aUoGhmhtI4AUizpK8LwxVBNoaf2w8z3Fu0huHvrQfwwIczQApB9JeTF1DEQJr5RUUYPr5+g6EZBFACkUVdEW4QMZpBAG4AyOY/N+8zgDSB/AiiQQCfZhDAGo1KcSEMr2/dBbPxaQYBDAmQ00FeAbnm+/sPeDWDAIqkp5nof3kJTobZN5gYOAUFwGKEDIF7AaTZwVCI4cCFt2ANII0gDDIIX6JhhIV6jPg7sOYbj76i2AbTjNMVIAME4gJJS5pIgBFZI6EAwwQMDAA3WJmRLK9LJgAAAABJRU5ErkJggg==";

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
            var __efb2_arg_itemstack,__efb2_arg_world,__efb2_arg_player;  (__efb2_arg_player).$setPositionAndUpdate(((((__efb2_arg_player).$getLook(1)))["$xCoord"]),(((((__efb2_arg_player).$getLook(1)))["$yCoord"]) + 1),((((__efb2_arg_player).$getLook(1)))["$zCoord"]));
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
            var __efb2_arg_attribute_map;  efb2__attrMapSet(__efb2_arg_attribute_map, "generic.attackDamage", 13);efb2__attrMapSet(__efb2_arg_attribute_map, "generic.maxHealth", 100);;
            return __efb2_arg_attribute_map;
        }
        $$CustomItem.prototype.$getStrVsBlock = function ($$itemstack, $$block) {
            ;
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("ender_pearl_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("ender_pearl_sword"), ModAPI.util.str("ender_pearl_sword"), $$custom_item);
            ModAPI.items["ender_pearl_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("ender_pearl_sword"));
        });
        AsyncSink.L10N.set("item.ender_pearl_sword.name", "Ender Pearl Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/ender_pearl_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/ender_pearl_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/ender_pearl_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/ender_pearl_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "ender_pearl",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAFfKj/FAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnUExURQAAADQGBf8AAC0AAHIAAKoPAUEFAFwHAEk2FWhOHolnJygeCwAAAAcr23cAAAANdFJOU////////////////wA96CKGAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAeElEQVQYVzWO0QLFIAhCQ1dtd/7/917AxkMcxaxRNWrq3IQSvjCBRyhkdqfGrIhR4JzaHCISwNzQBt2VX2mgM4JdkFvzjJbvjfpVurNUCo5biOg1LcQVWnfEcp5tWHxidtk7sPc6ZTfuJ/F9lt/G8wr8ODXyI6vqD/zOCTaHDNKKAAAAAElFTkSuQmCC";

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
                ModAPI.util.str("redstone_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("redstone_sword"), ModAPI.util.str("redstone_sword"), $$custom_item);
            ModAPI.items["redstone_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("redstone_sword"));
        });
        AsyncSink.L10N.set("item.redstone_sword.name", "Redstone Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/redstone_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/redstone_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/redstone_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/redstone_sword";
            var $$recipeLegend = {
                "A": {
                type: "item",
                id: "redstone",
                
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
    const $$itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD2SURBVDhPnZHbC8FwFMfP5PZgiZDLKB5c8mIPeJU3/7M8K4k3oSghyYtLbnuYvqdtWWYb31o7v9/Z53suE+gPteWSqoX0swHgZq3Kcbc/Jg9HLqXDq/VWu/mhg3c4J6W5+mCyEFwZvMNhMQSQYeQcDexgyAjwId690dR0V85n6Xi+WMKQaYkBv88wcgNDhgEqP54KpWIRqlcKDC83O1sYsvyNRSnBcD6TtIWhjwRaxyjo5nxXbGHI1EGnEVeL2RsdTlc+i0Efj8OHLzIMALfkKA3nXq6K6nicTAR966isw5zRpMPfRmEDbH623jvOayUP2gT8n4heqJqQyG3DSFcAAAAASUVORK5CYII=";

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
                ModAPI.util.str("soul_sand_sword")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("soul_sand_sword"), ModAPI.util.str("soul_sand_sword"), $$custom_item);
            ModAPI.items["soul_sand_sword"] = $$custom_item;
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
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("soul_sand_sword"));
        });
        AsyncSink.L10N.set("item.soul_sand_sword.name", "Soul Sand Sword");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/soul_sand_sword.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/soul_sand_sword"
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
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/soul_sand_sword.png", await (await fetch(
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
            var $$resultItemArg = "item/soul_sand_sword";
            var $$recipeLegend = {
                "A": {
                type: "block",
                id: "soul_sand",
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
})();
})();
