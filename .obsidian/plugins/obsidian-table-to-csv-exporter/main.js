/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => Table2CSVPlugin
});
var import_obsidian = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  exportPath: "./",
  baseFilename: "table-export",
  fileNumber: "001",
  sepChar: ",",
  quoteData: false,
  saveToClipboardToo: false
};
var Table2CSVPlugin = class extends import_obsidian.Plugin {
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addCommand({
        id: "obsidian-table-to-csv-exporter",
        name: "Export table to CSV file",
        checkCallback: (checking) => {
          const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
          if (view) {
            if (!checking) {
              const viewMode = view.getMode();
              if (viewMode == "preview") {
                const csvString = htmlToCSV(view.previewMode.containerEl, this.settings.sepChar, this.settings.quoteData);
                if (csvString.length > 0) {
                  let filename = `${this.app.workspace.activeLeaf.view.file.basename}-${this.settings.fileNumber}.csv`;
                  if(this.settings.baseFilename)
                   filename = `${this.settings.baseFilename}-${this.settings.fileNumber}.csv`;
                  this.app.vault.create(filename, csvString).then(() => {
                    let fn = +this.settings.fileNumber;
                    fn++;
                    if (fn == 1e3)
                      fn = 1;
                    let newFileNumberString = fn + "";
                    while (newFileNumberString.length < 3)
                      newFileNumberString = "0" + newFileNumberString;
                    this.settings.fileNumber = newFileNumberString;
                    if (this.settings.saveToClipboardToo) {
                      let _csvString =csvString
                      _csvString=_csvString.replace(/,/g, '\t').replace(/\ufeff/, '')
                      navigator.clipboard.writeText(_csvString).then(() => {
                        new import_obsidian.Notice(`The file ${filename} was successfully created in your vault. The contents was also copied to the clipboard.`);
                      }).catch((err) => {
                        new import_obsidian.Notice("There was an error with copying the contents to the clipboard.");
                      });
                    } else {
                      new import_obsidian.Notice(`The file ${filename} was successfully created in your vault.`);
                    }
                  }).catch((error) => {
                    const errorMessage = `Error: ${error.message}`;
                    new import_obsidian.Notice(errorMessage);
                  });
                } else {
                  new import_obsidian.Notice(`No table was found. No CSV file was written.`);
                }
              } else {
                new import_obsidian.Notice("This command only works on panes in reading mode! \u2013 No CSV files were written.");
              }
            }
            return true;
          }
          return false;
        }
      });
      this.addSettingTab(new Table2CSVSettingTab(this.app, this));
    });
  }
  onunload() {
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};
function htmlToCSV(html, sep, quote) {
  var data = [];
  var table = html.querySelectorAll("table");
  console.log(`htmlToCSV::table: ${table}`);
  for(var t= 0; t< table.length; t ++){
    if (table[t]) {
      var rows = table[t].rows;
      console.log(`htmlToCSV::rows: ${rows}`);
      for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        for (var j = 0; j < cols.length; j++) {
          if (!quote) {
            row.push(cols[j].innerText);
          } else {
            row.push('"' + cols[j].innerText + '"');
          }
        }
        data.push(row.join(sep));
      }
    }
    data.push('\n\n');
}


  if (data.length > 0)
    return '\ufeff'+data.join("\n");
  else
    return "";
}
var Table2CSVSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Settings for the Table to CSV Plugin." });
    containerEl.createEl("p", { text: "NOTE #1: Currently, this plugin will only work reliably when there is only one table in a note." });
    containerEl.createEl("p", { text: "NOTE #2: Currently, the exported CSV files are saved inside your vault main folder." });
    new import_obsidian.Setting(containerEl).setName("CSV file base filename").setDesc('Enter the base filename. The "File Number addendum" gets added after that and finally .csv').addText((text) => text.setPlaceholder("<enter a base filename").setValue(this.plugin.settings.baseFilename).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.baseFilename = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("File Number addendum").setDesc("This number gets added to the base filename and incremented after each export. Normally, you shouldn't need to edit this.").addText((text) => text.setPlaceholder("").setValue(this.plugin.settings.fileNumber).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.fileNumber = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Data fields separation character/string").setDesc("This character (or string) will be put between each cell's data. Defaults to a comma. Special characters (like \\t for a TAB) don't work yet.").addText((text) => text.setPlaceholder("<enter a separation character or string>").setValue(this.plugin.settings.sepChar).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.sepChar = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Quote data").setDesc("Do you want quotation marks around each cell's data?").addToggle((toggle) => toggle.setValue(this.plugin.settings.quoteData).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.quoteData = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Copy to clipboard, too").setDesc("Do you want to copy the contents of the CSV file to the system clipboard, too?").addToggle((toggle) => toggle.setValue(this.plugin.settings.saveToClipboardToo).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.saveToClipboardToo = value;
      yield this.plugin.saveSettings();
    })));
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRmlsZSAgICAgICA6IG1haW4udHNcbi8vIEF1dGhvciAgICAgOiBTdGVmYW4gV29sZnJ1bSAoQG1ldGF3b3BzKVxuLy8gRGF0ZSAgICAgICA6IDIwMjItMDUtMjdcbi8vIExhc3QgVXBkYXRlOiAyMDIyLTA1LTMxXG4vLyBEZXNjcmlwdGlvbjogSW1wbGVtZW50YXRpb24gb2YgbXkgdmVyeSBmaXJzdCBPYnNpZGlhbiBwbHVnaW4uXG4vLyAgICAgICAgICAgICAgSXQgYWxsb3dzIHRvIGV4cG9ydCByZW5kZXJlZCBIVE1MIHRhYmxlcyAoaS5lLiBmcm9tIGEgcGFuZSBpbiByZWFkaW5nIG1vZGUpXG4vLyAgICAgICAgICAgICAgdG8gYmUgZXhwb3J0ZWQgdG8gYSBDU1YgZmlsZSBhbmQgb3B0aW9uYWxseSB0byB0aGUgY2xpcGJvYXJkLCB0b28uXG4vLyAgICAgICAgICAgICAgUHVyZWx5IGJhc2VkIG9uIHRoZSBPYnNpZGlhbiBzYW1wbGUgcGx1Z2luLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5pbXBvcnQgeyBBcHAsIEVkaXRvciwgTWFya2Rvd25WaWV3LCBNb2RhbCwgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5cbmludGVyZmFjZSBUYWJsZTJDU1ZTZXR0aW5ncyB7XG4gICBleHBvcnRQYXRoOiBzdHJpbmc7XG4gICBiYXNlRmlsZW5hbWU6IHN0cmluZztcbiAgIGZpbGVOdW1iZXI6IHN0cmluZztcbiAgIHNlcENoYXI6IHN0cmluZztcbiAgIHF1b3RlRGF0YTogYm9vbGVhbjtcbiAgIHNhdmVUb0NsaXBib2FyZFRvbzogYm9vbGVhbjtcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogVGFibGUyQ1NWU2V0dGluZ3MgPSB7XG4gICBleHBvcnRQYXRoOiAnLi8nLFxuICAgYmFzZUZpbGVuYW1lOiAndGFibGUtZXhwb3J0JyxcbiAgIGZpbGVOdW1iZXI6ICcwMDEnLFxuICAgc2VwQ2hhcjogJywnLFxuICAgcXVvdGVEYXRhOiBmYWxzZSxcbiAgIHNhdmVUb0NsaXBib2FyZFRvbzogZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUyQ1NWUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgIHNldHRpbmdzOiBUYWJsZTJDU1ZTZXR0aW5ncztcblxuICAgYXN5bmMgb25sb2FkKCkge1xuICAgICAgXG4gICAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG4gICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgaWQ6ICdvYnNpZGlhbi10YWJsZS10by1jc3YtZXhwb3J0ZXInLFxuICAgICAgICAgbmFtZTogJ0V4cG9ydCB0YWJsZSB0byBDU1YgZmlsZScsXG4gICAgICAgICBjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHtcblxuICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh2aWV3KSB7XG4gICAgICAgICAgICAgICBpZiAoIWNoZWNraW5nKSB7XG4gICAgICAgICAgICAgICAgICAvLyBIZXJlIHdlIGNhbiBhY3R1YWxseSBzdGFydCB3aXRoIG91ciB3b3JrXG4gICAgICAgICAgICAgICAgICBjb25zdCB2aWV3TW9kZSA9IHZpZXcuZ2V0TW9kZSgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHZpZXdNb2RlPT1cInByZXZpZXdcIikge1xuICAgICAgICAgICAgICAgICAgICAgLy8gTm93IGNvbnZlcnQgdGhlIHRhYmxlc1xuICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3N2U3RyaW5nID0gaHRtbFRvQ1NWKHZpZXcucHJldmlld01vZGUuY29udGFpbmVyRWwsIHRoaXMuc2V0dGluZ3Muc2VwQ2hhciwgdGhpcy5zZXR0aW5ncy5xdW90ZURhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwclx1MDBGQ2Zlbiwgb2IgY3N2U3RyaW5nIGxlZXIgb2RlciBuaWNodCEgTnVyIHdlbm4gbmljaHQsIERhdGVpIGFubGVnZW4gZXRjLlxuICAgICAgICAgICAgICAgICAgICAgaWYgKGNzdlN0cmluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IGAke3RoaXMuc2V0dGluZ3MuYmFzZUZpbGVuYW1lfS0ke3RoaXMuc2V0dGluZ3MuZmlsZU51bWJlcn0uY3N2YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwLnZhdWx0LmNyZWF0ZShmaWxlbmFtZSwgY3N2U3RyaW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluY3JlbWVudCB0aGUgZmlsZSBudW1iZXIgYWRkaXRpb24gc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaXJzdCwgY29udmVydCB0aGUgY3VycmVudCBzdHJpbmcgdG8gYSBudW1iZXI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm46IG51bWJlciA9ICt0aGlzLnNldHRpbmdzLmZpbGVOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIGluY3JlbWVudCB0aGUgbnVtYmVyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IGFsbG93IG1vcmUgdGhhdCA5OTk7IHJlc3RhcnQgd2l0aCAwMDEgaW4gdGhhdCBjYXNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZuPT0xMDAwKSBmbiA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHRoZSBudW1iZXIgdG8gYSBzdHJpbmcgYWdhaW46XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RmlsZU51bWJlclN0cmluZzogc3RyaW5nID0gZm4gKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIGxlYWRpbmcgemVyb2VzIHRvIHRoZSBzdHJpbmc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobmV3RmlsZU51bWJlclN0cmluZy5sZW5ndGggPCAzKSBuZXdGaWxlTnVtYmVyU3RyaW5nID0gXCIwXCIgKyBuZXdGaWxlTnVtYmVyU3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5maWxlTnVtYmVyID0gbmV3RmlsZU51bWJlclN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNhdmVUb0NsaXBib2FyZFRvbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLndyaXRlVGV4dChjc3ZTdHJpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGBUaGUgZmlsZSAke2ZpbGVuYW1lfSB3YXMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgaW4geW91ciB2YXVsdC4gVGhlIGNvbnRlbnRzIHdhcyBhbHNvIGNvcGllZCB0byB0aGUgY2xpcGJvYXJkLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKCdUaGVyZSB3YXMgYW4gZXJyb3Igd2l0aCBjb3B5aW5nIHRoZSBjb250ZW50cyB0byB0aGUgY2xpcGJvYXJkLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGBUaGUgZmlsZSAke2ZpbGVuYW1lfSB3YXMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgaW4geW91ciB2YXVsdC5gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGVycm9yTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGBObyB0YWJsZSB3YXMgZm91bmQuIE5vIENTViBmaWxlIHdhcyB3cml0dGVuLmApO1xuICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoJ1RoaXMgY29tbWFuZCBvbmx5IHdvcmtzIG9uIHBhbmVzIGluIHJlYWRpbmcgbW9kZSEgXHUyMDEzIE5vIENTViBmaWxlcyB3ZXJlIHdyaXR0ZW4uJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICB9XG4gICAgICB9KTtcblxuXG4gICAgICAvLyBUaGlzIGFkZHMgYSBzZXR0aW5ncyB0YWIgc28gdGhlIHVzZXIgY2FuIGNvbmZpZ3VyZSB2YXJpb3VzIGFzcGVjdHMgb2YgdGhlIHBsdWdpblxuICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBUYWJsZTJDU1ZTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG4gICB9XG5cbiAgIG9udW5sb2FkKCkge1xuICAgfVxuXG4gICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcbiAgIH1cblxuICAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgIH1cbn1cblxuXG5mdW5jdGlvbiBodG1sVG9DU1YoaHRtbDogSFRNTEVsZW1lbnQsIHNlcDogc3RyaW5nLCBxdW90ZTogYm9vbGVhbikge1xuXHR2YXIgZGF0YSA9IFtdO1xuXHR2YXIgdGFibGUgPSBodG1sLnF1ZXJ5U2VsZWN0b3IoXCJ0YWJsZVwiKTsgXG4gICBjb25zb2xlLmxvZyhgaHRtbFRvQ1NWOjp0YWJsZTogJHt0YWJsZX1gKTtcblx0XHRcdFxuICAgaWYgKHRhYmxlKSB7XG4gICAgICB2YXIgcm93cyA9IHRhYmxlLnJvd3M7XG4gICAgICBjb25zb2xlLmxvZyhgaHRtbFRvQ1NWOjpyb3dzOiAke3Jvd3N9YCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIHZhciByb3cgPSBbXSwgY29scyA9IHJvd3NbaV0ucXVlcnlTZWxlY3RvckFsbChcInRkLCB0aFwiKTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb2xzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoIXF1b3RlKSB7XG4gICAgICAgICAgICAgICByb3cucHVzaCgoY29sc1tqXSBhcyBIVE1MRWxlbWVudCkuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICByb3cucHVzaCgnXCInICsgKGNvbHNbal0gYXMgSFRNTEVsZW1lbnQpLmlubmVyVGV4dCArICdcIicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgIGRhdGEucHVzaChyb3cuam9pbihzZXApKTtcbiAgICAgIH1cbiAgIH1cbiAgIGNvbnNvbGUubG9nKGBodG1sVG9DU1Y6OmRhdGEubGVuZ3RoOiAke2RhdGEubGVuZ3RofWApO1xuICAgaWYgKGRhdGEubGVuZ3RoID4gMClcbiAgICAgIHJldHVybiBkYXRhLmpvaW4oXCJcXG5cIik7XG4gICBlbHNlXG4gICAgICByZXR1cm4gXCJcIjtcbn1cblxuY2xhc3MgVGFibGUyQ1NWU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICAgcGx1Z2luOiBUYWJsZTJDU1ZQbHVnaW47XG5cbiAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFRhYmxlMkNTVlBsdWdpbikge1xuICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICB9XG5cbiAgIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgICBjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcblxuICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdTZXR0aW5ncyBmb3IgdGhlIFRhYmxlIHRvIENTViBQbHVnaW4uJ30pO1xuICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7dGV4dDogJ05PVEUgIzE6IEN1cnJlbnRseSwgdGhpcyBwbHVnaW4gd2lsbCBvbmx5IHdvcmsgcmVsaWFibHkgd2hlbiB0aGVyZSBpcyBvbmx5IG9uZSB0YWJsZSBpbiBhIG5vdGUuJ30pO1xuICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7dGV4dDogJ05PVEUgIzI6IEN1cnJlbnRseSwgdGhlIGV4cG9ydGVkIENTViBmaWxlcyBhcmUgc2F2ZWQgaW5zaWRlIHlvdXIgdmF1bHQgbWFpbiBmb2xkZXIuJ30pO1xuXG4gICAgICAvLyBCZWluZyBhYmxlIHRvIHNldCBhIHBhdGggZm9yIHRoZSBleHBvcnRzIHdpbGwgYmUgYSBmdXR1cmUgYWRkaXRpb25cbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgLy8gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAvLyAgICAuc2V0TmFtZSgnQ1NWIGZpbGUgZXhwb3J0IHBhdGgnKVxuICAgICAgLy8gICAgLnNldERlc2MoJ0VudGVyIHRoZSBwYXRoIHdoZXJlIHRoZSBleHBvcnRlZCBDU1YgZmlsZSBzaG91bGQgYmUgc2F2ZWQuIElmIG5vIHBhdGggaXMgc2V0IHRoZSBDU1YgZmlsZSB3aWxsIGJlIHNhdmVkIGludG8geW91ciB2YXVsdCBmb2xkZXIuJylcbiAgICAgIC8vICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgLy8gICAgICAgLnNldFBsYWNlaG9sZGVyKCc8ZW50ZXIgYSBwYXRoPicpXG4gICAgICAvLyAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwb3J0UGF0aClcbiAgICAgIC8vICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgIC8vICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXRoOiAnICsgdmFsdWUpO1xuICAgICAgLy8gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZXhwb3J0UGF0aCA9IHZhbHVlO1xuICAgICAgLy8gICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAvLyAgICAgICB9KSk7XG5cbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgLnNldE5hbWUoJ0NTViBmaWxlIGJhc2UgZmlsZW5hbWUnKVxuICAgICAgICAgLnNldERlc2MoJ0VudGVyIHRoZSBiYXNlIGZpbGVuYW1lLiBUaGUgXCJGaWxlIE51bWJlciBhZGRlbmR1bVwiIGdldHMgYWRkZWQgYWZ0ZXIgdGhhdCBhbmQgZmluYWxseSAuY3N2JylcbiAgICAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dFxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCc8ZW50ZXIgYSBiYXNlIGZpbGVuYW1lJylcbiAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5iYXNlRmlsZW5hbWUpXG4gICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdiYXNlIGZpbGVuYW1lOiAnICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYmFzZUZpbGVuYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIFxuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAuc2V0TmFtZSgnRmlsZSBOdW1iZXIgYWRkZW5kdW0nKVxuICAgICAgICAgLnNldERlc2MoJ1RoaXMgbnVtYmVyIGdldHMgYWRkZWQgdG8gdGhlIGJhc2UgZmlsZW5hbWUgYW5kIGluY3JlbWVudGVkIGFmdGVyIGVhY2ggZXhwb3J0LiBOb3JtYWxseSwgeW91IHNob3VsZG5cXCd0IG5lZWQgdG8gZWRpdCB0aGlzLicpXG4gICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignJylcbiAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5maWxlTnVtYmVyKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZmlsZU51bWJlcjogJyArIHZhbHVlKTtcbiAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVOdW1iZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgIC5zZXROYW1lKCdEYXRhIGZpZWxkcyBzZXBhcmF0aW9uIGNoYXJhY3Rlci9zdHJpbmcnKVxuICAgICAgICAgLnNldERlc2MoJ1RoaXMgY2hhcmFjdGVyIChvciBzdHJpbmcpIHdpbGwgYmUgcHV0IGJldHdlZW4gZWFjaCBjZWxsXFwncyBkYXRhLiBEZWZhdWx0cyB0byBhIGNvbW1hLiBTcGVjaWFsIGNoYXJhY3RlcnMgKGxpa2UgXFxcXHQgZm9yIGEgVEFCKSBkb25cXCd0IHdvcmsgeWV0LicpXG4gICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHRcbiAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignPGVudGVyIGEgc2VwYXJhdGlvbiBjaGFyYWN0ZXIgb3Igc3RyaW5nPicpXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2VwQ2hhcilcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NlcENoYXI6ICcgKyB2YWx1ZSk7XG4gICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZXBDaGFyID0gdmFsdWU7XG4gICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pKTtcbiAgIFxuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAuc2V0TmFtZSgnUXVvdGUgZGF0YScpXG4gICAgICAgICAuc2V0RGVzYygnRG8geW91IHdhbnQgcXVvdGF0aW9uIG1hcmtzIGFyb3VuZCBlYWNoIGNlbGxcXCdzIGRhdGE/JylcbiAgICAgICAgIC5hZGRUb2dnbGUoIHRvZ2dsZSA9PiB0b2dnbGVcbiAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5xdW90ZURhdGEpXG4gICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdxdW90ZSBkYXRhIHRvZ2dsZTogJyArIHZhbHVlKTtcbiAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnF1b3RlRGF0YSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KSk7XG4gICBcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgLnNldE5hbWUoJ0NvcHkgdG8gY2xpcGJvYXJkLCB0b28nKVxuICAgICAgICAgLnNldERlc2MoJ0RvIHlvdSB3YW50IHRvIGNvcHkgdGhlIGNvbnRlbnRzIG9mIHRoZSBDU1YgZmlsZSB0byB0aGUgc3lzdGVtIGNsaXBib2FyZCwgdG9vPycpXG4gICAgICAgICAuYWRkVG9nZ2xlKCB0b2dnbGUgPT4gdG9nZ2xlXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2F2ZVRvQ2xpcGJvYXJkVG9vKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc2F2ZSB0byBjbGlwYm9hcmQsIHRvbzogJyArIHZhbHVlKTtcbiAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNhdmVUb0NsaXBib2FyZFRvbyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KSk7XG4gICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQVdBLHNCQUE0RjtBQVc1RixJQUFNLG1CQUFzQztBQUFBLEVBQ3pDLFlBQVk7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUNkLFlBQVk7QUFBQSxFQUNaLFNBQVM7QUFBQSxFQUNULFdBQVc7QUFBQSxFQUNYLG9CQUFvQjtBQUFBO0FBR3ZCLG9DQUE2Qyx1QkFBTztBQUFBLEVBRzNDLFNBQVM7QUFBQTtBQUVaLFlBQU0sS0FBSztBQUVYLFdBQUssV0FBVztBQUFBLFFBQ2IsSUFBSTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sZUFBZSxDQUFDLGFBQXNCO0FBRW5DLGdCQUFNLE9BQU8sS0FBSyxJQUFJLFVBQVUsb0JBQW9CO0FBRXBELGNB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
