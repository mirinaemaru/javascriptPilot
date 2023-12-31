	(function(){
		var GRID_COMPONENTS = {        
	         getCodeCellRenderer : function(params){
	            if(params.value){
	                var code = CODE(params.value);
	                if(code) {
	                    return code.codeName;            
	                } else {
	                    return params.value;
	                }
	            } else {
	                return undefined;
	            }	
			}
			, getYnCheckboxCellRenderer : function(params){
	            var value = '';
	            if(params && params.value) {
	            	value = params.value||'';
	            }
	            
				let _checked = (value == "Y") ? "checked" : "";
				let _id = "chk_" + params.node.id + "_" + params.colDef.field + "_"+ Date.now();
				let html = "<span class='chk-box solo'> "
				         + "<input type='checkbox' "+ _checked +" disabled id='" + _id + "'><label for='"+ _id +"'></label>"
				         + "</span>";
				         
		        return html;	        			
			}
			, getYnCheckboxEditableRenderer : function(){
	            function CheckboxRenderer() {}

	            CheckboxRenderer.prototype.init = function(params) {
	                this.params = params;

					let _id = "chk_" + params.node.id + "_" + params.colDef.field + "_"+ Date.now();

	                this.eGui = document.createElement('input');
                    this.eGui.type = 'checkbox';
                    this.eGui.checked = params.value === 'Y' ? true : false;
					this.eGui.id = _id;
                    
					var editable = ( (typeof params.colDef.editable == "boolean" && params.colDef.editable) || ($.isFunction(params.colDef.editable) && params.colDef.editable(params)) ) ;
                                
            		if(editable) {
            			this.checkedHandler = this.checkedHandler.bind(this);
                    	this.eGui.addEventListener('click', this.checkedHandler);
                    } else {
                    	this.eGui.readonly = true;
                    	this.eGui.disabled = true;
                    	this.eGui.style.height = "35px";
                    }
                    
					this.container = document.createElement('span');
					this.container.classList.add("chk-box","solo");
					
					this.container.appendChild(this.eGui);
					$(this.container).append("<label for='"+_id+"'></label>");
	            }
				
	            CheckboxRenderer.prototype.checkedHandler = function(e) {
	                var checked = e.target.checked ? 'Y': 'N';
	                var colId = this.params.column.colId;
	                this.params.node.setDataValue(colId, checked);
	            }

	            CheckboxRenderer.prototype.getGui = function(params) {
					return this.container;
	            }

	            CheckboxRenderer.prototype.destroy = function(params) {
	                this.eGui.removeEventListener('click', this.checkedHandler);
	            }

	            return CheckboxRenderer;
			}
			, getYyyyMmDdHhMiCellRenderer : function(params){
				//When use enableFillHandle, value(YYYYMMDD) type is number.
				var value = String(params.value||''); 
				
				var html = "";
				var date = "&nbsp";
				var time = "";
				if(value != "" && value != " ") {
					var split_char = "-";
				    var sourceDate = value.replace(/\D/g, "");
				    
				    var yyyy = value.substr(0, 4);
				    if(yyyy == "0000") {
				    	return "";
				    }
				    
				    var mm = value.substr(4, 2);
				    var dd = value.substr(6, 2);
			    
			    	date = yyyy + split_char + mm + split_char + dd;
			    	if(value.length > 8) {
						if(value.substr(8,4) != "0000") {
							var t = value.substr(8,6);
							var hh = t.substr(0, 2);
							var mi = t.substr(2, 2);
							time = hh + ":"+ mi;
							
							if(t.length>4) {
								var ss = t.substr(4, 2);								
								time += ":"+ ss;
							}
							
						}
					}
				} 
				
				if ( (typeof params.colDef.editable == "boolean" && params.colDef.editable) || ($.isFunction(params.colDef.editable) && params.colDef.editable(params)) ) {
					html = "<div class='inForm-dateTime2'>" + date + " " + time + "</div>";
				}  else {
					html = date + " " + time;
				}	
		        return html;
			}
			, getHhMiCellRenderer : function(params){
				var value = String(params.value||''); 
				
				var html = "";
				if(value != "" && value != " ") {
					var time = value.replace(/\D/g, "");
				    
				    var hh = time.substr(0, 2);
					var mi = time.substr(2, 2);
					html += " " + hh + ":"+ mi;
					
					if(time.length>4) {
						var ss = time.substr(4, 2);								
						html += ":"+ ss;
					}

				}
				
				if ( (typeof params.colDef.editable == "boolean" && params.colDef.editable) || ($.isFunction(params.colDef.editable) && params.colDef.editable(params)) ) {
					html = "<div class='inForm-time3'>" + html + "</div>";
				}  
								
		        return html;	
			}
			, getDatePicker : function(){
				  function Datepicker() {}
					
				  Datepicker.prototype.init = function (params) {
				    // create the cell
				    this.eInput = document.createElement('input');
				    this.eInput.classList.add('ag-input');
				    this.eInput.style.height = '100%';
				    
				    if (params.value !== undefined && params.value !== null) {
						this.eInput.value = params.value;
					}
					                
				    $(this.eInput).datepicker({
				      dateFormat: 'yy-mm-dd',
				    });
				  };
				
				  Datepicker.prototype.getGui = function () {
				    return this.eInput;
				  };
				
				  Datepicker.prototype.afterGuiAttached = function () {
				    this.eInput.focus();
				    //this.eInput.select();
				  };
				
				  Datepicker.prototype.getValue = function () {
				    return this.eInput.value;
				  };
				
				  return Datepicker;
			}
			, getDatetimePicker : function(){
				  function DatetimePicker() {}

					DatetimePicker.prototype.init = function(params) {
					    this.params = params;
					    this.eContainer = document.createElement('div');
					    
						this.eInput = document.createElement('input');
						this.eInput.style.height = '100%';
						this.eInput.size = 10;
						
						this.eInputTime = document.createElement('input');
						this.eInputTime.style.height = '100%';
						this.eInputTime.size = 6;
						
					    this.defaultDate = "";
					
					    if (params.value !== undefined && params.value !== null) {
					    	this.defaultDate = params.value;
						} else {
							var today = new Date();
							this.defaultDate = today.toISOString().substring(0, 10) + '0000';
						}
						
						var source_date = this.defaultDate;	    	
						var day_split = "-";
						var time_split = ":";
						var sourceDate = source_date.replace(/-/gi,"");
						sourceDate = sourceDate.replace(/:/gi,"");
						sourceDate = sourceDate.replace(/ /gi,"");
						
						var yyyy = sourceDate.substr(0, 4);
						var mm = sourceDate.substr(4, 2);
						var dd = sourceDate.substr(6, 2);
						var hh = "00";
						var mi = "00";
						if(sourceDate.length > 8) {
							hh = sourceDate.substr(8, 2);
							mi = sourceDate.substr(10, 2);
						}
						
						this.eInput.value = yyyy + day_split + mm + day_split + dd;
						this.eInputTime.value = hh + time_split + mi;
					    	
					    $(this.eInput).datepicker({
					    	dateFormat: 'yy-mm-dd',
					    });
					    $(this.eInput).addClass("input1");
					    $(this.eInputTime).addClass("input1");
					    	    
					    this.eContainer.appendChild(this.eInput);
					    this.eContainer.appendChild(this.eInputTime);
					}                
					
					DatetimePicker.prototype.getGui = function(params) {
					    return this.eContainer;
					}
					
					DatetimePicker.prototype.afterGuiAttached = function() {
					    this.eInput.focus();
					    //this.eInput.select();
					};
					
					DatetimePicker.prototype.getValue = function() {
						var source_date = this.eInput.value + ' ' + this.eInputTime.value;	    	
						var day_split = "-";
						var time_split = ":";
						var sourceDate = source_date.replace(/-/gi,"");
						sourceDate = sourceDate.replace(/:/gi,"");
						sourceDate = sourceDate.replace(/ /gi,"");
						
						var yyyy = sourceDate.substr(0, 4);
						var mm = sourceDate.substr(4, 2);
						var dd = sourceDate.substr(6, 2);
						var hh = "00";
						var mi = "00";
						if(sourceDate.length > 8) {
							hh = sourceDate.substr(8, 2);
							mi = sourceDate.substr(10, 2);
						}
						
						var dat = yyyy + day_split + mm + day_split + dd;
						var tim = hh + time_split + mi;
						             
					    return dat + ' ' + tim ;
					};
					
					DatetimePicker.prototype.destroy = function(params) {                    
					}
					
					DatetimePicker.prototype.isPopup = function() {
					    return false;
					};
					
					return DatetimePicker;
			}
			, getYyyyMmDdPicker : function(){
				  function Datepicker() {}
					
				  Datepicker.prototype.init = function (params) {
				    // create the cell
				    this.eContainer = document.createElement('div');
					this.eContainer.classList.add("inForm-date");
					    
				    this.eInput = document.createElement('input');
				    this.eInput.classList.add('input','day','datepicker');
				    this.eInput.style.height = '100%';
				    this.eInput.placeholder = "yyyymmdd";
				    
				    if (params.value !== undefined && params.value !== null) {
						this.eInput.value = params.value;
					}
					
					if(params.cellStartedEdit && isCharNumeric(params.charPress)) {
						this.eInput.value = params.charPress;
					}
					    
				    $(this.eInput).datepicker({
				      dateFormat: 'yymmdd',
				    });
				    
				    this.eContainer.appendChild(this.eInput);
				  };
				
				  Datepicker.prototype.getGui = function () {
				    return this.eContainer;
				  };
				
				  Datepicker.prototype.afterGuiAttached = function () {
				    this.eInput.focus();
				    /*
				    if(this.eInput.value.length>1) {
					    this.eInput.select();
					}
					*/
				  };
				
				  Datepicker.prototype.getValue = function () {
				    return this.eInput.value;
				  };
				
				  return Datepicker;
			}
			, getYyyyMmDdHhMiPicker : function(){
				  function DatetimePicker() {}

					DatetimePicker.prototype.init = function(params) {
					    this.params = params;
					    this.eContainer = document.createElement('div');
					    this.eContainer.classList.add("inForm-dateTime2");
					    
						this.eInput = document.createElement('input');
						this.eInput.style.height = '100%';
						this.eInput.size = 8;
						this.eInput.placeholder = "yyyymmdd";
						
						this.eInputTime = document.createElement('input');
						this.eInputTime.style.height = '100%';
						this.eInputTime.size = 4;
						this.eInputTime.placeholder = "00:00";
						
					    this.defaultDate = "";
					    
					    if (params.value !== undefined && params.value !== null) {
					    	this.defaultDate = params.value;
						} 
						
						if(params.cellStartedEdit && isCharNumeric(params.charPress)) {
							this.defaultDate = params.charPress;
						}
						
						var source_date = this.defaultDate;	    	
						var day_split = "";
						var time_split = "";
						var sourceDate = source_date.replace(/-/gi,"");
						sourceDate = sourceDate.replace(/:/gi,"");
						sourceDate = sourceDate.replace(/ /gi,"");
						
						var yyyy = sourceDate.substr(0, 4);
						var mm = sourceDate.substr(4, 2);
						var dd = sourceDate.substr(6, 2);
						
						this.eInput.value = yyyy + day_split + mm + day_split + dd;
						
						this.eInputTime.value = "";
						if(sourceDate.length > 8) {
							var hh = "";
							var mi = "";
							
							hh = sourceDate.substr(8, 2);
							mi = sourceDate.substr(10, 2);
							this.eInputTime.value = hh + time_split + mi;
						}
						
						this.showDayList = [];
						
						if (params.colDef.cellEditorParams) {
							this.showDayList = params.colDef.cellEditorParams(params).values;
						}
						
						var _this = this;
					    $(this.eInput).datepicker({
					      dateFormat: 'yymmdd',
					      beforeShowDay: function(date) {
					      		var dayList = _this.showDayList;
								if(dayList && dayList.length > 0) {								
									var m = (date.getMonth())+1, d = date.getDate(), y = date.getFullYear();									
									if(m<10) {
										m='0'+m;
									}
									if(d<10) {
										d='0'+d;
									}
									var yyyymmdd = y + ''+m +''+ d;
									
								    for (i = 0; i < dayList.length; i++) {
								        if($.inArray(yyyymmdd, dayList) != -1) {
								            return [true];
								        }
								    }
								    return [false];
							    } else {
							    	return [true];
							    }						
						  }
					    });
			    
					    $(this.eInput).addClass("input");
					    $(this.eInput).addClass("day");
					    
					    $(this.eInputTime).addClass("input");
					    $(this.eInputTime).addClass("time");
					    	    
					    this.eContainer.appendChild(this.eInput);
					    this.eContainer.appendChild(this.eInputTime);
					}                
					
					DatetimePicker.prototype.getGui = function(params) {
					    return this.eContainer;
					}
					
					DatetimePicker.prototype.afterGuiAttached = function() {
						this.eInput.focus();
						/*
					    if(this.eInput.value.length>1) {
					    	this.eInput.select();
					    }
					    */
					};
					
					DatetimePicker.prototype.getValue = function() {
						if(this.eInput.value == "") {
							this.eInputTime.value = "";
							return "";
						}
						
						var source_date = this.eInput.value + ' ' + this.eInputTime.value;
						var day_split = "";
						var time_split = "";
						var sourceDate = source_date.replace(/-/gi,"");
						sourceDate = sourceDate.replace(/:/gi,"");
						sourceDate = sourceDate.replace(/ /gi,"");
						
						var yyyy = sourceDate.substr(0, 4);
						var mm = sourceDate.substr(4, 2);
						var dd = sourceDate.substr(6, 2);
						var hh = "";
						var mi = "";
						if(sourceDate.length > 8) {
							hh = sourceDate.substr(8, 2);
							mi = sourceDate.substr(10, 2);
							if(hh == "00" && mi == "00") {
								hh = "";
								mi = "";
							}
						}
						
						var dat = yyyy + day_split + mm + day_split + dd;
						var tim = hh + time_split + mi;
						
					    return dat + '' + tim ;
					};
					
					DatetimePicker.prototype.destroy = function(params) {        
						//console.log("destroy");            
					}
					
					DatetimePicker.prototype.isPopup = function() {
					    return false;
					};
										
					return DatetimePicker;
			}
			, getHhMiPicker : function(){
				function DatetimePicker() {}

				DatetimePicker.prototype.init = function(params) {
					this.params = params;
					this.eContainer = document.createElement('div');
					this.eContainer.classList.add("inForm-time3");
					
					this.eInput = document.createElement('input');
					this.eInput.style.height = '100%';
					this.eInput.maxLength = 6;					
					this.eInput.classList.add("input","time");
					this.eInput.placeholder = "00:00:00";
					
					this.defaultDate = "";
					if (params.value !== undefined && params.value !== null) {
						this.defaultDate = params.value;
					}
					
					if(params.cellStartedEdit && isCharNumeric(params.charPress)) {
						this.defaultDate = params.charPress;
					}
					
					var time_split = "";
					var sourceDate = this.defaultDate.replace(/\D/g, "");
					var time = sourceDate.substr(0, 2) + time_split + sourceDate.substr(2, 2);
					if (sourceDate.length > 4) {
						time += time_split + sourceDate.substr(4, 2);
					}
					this.eInput.value = time;
					
					this.eContainer.appendChild(this.eInput);
				}
				
				DatetimePicker.prototype.getGui = function(params) {
					return this.eContainer;
				}
				
				DatetimePicker.prototype.afterGuiAttached = function() {
					this.eInput.focus();
					/*
					if(this.eInput.value.length>1) {
						this.eInput.select();
					}
					*/
				};
				
				DatetimePicker.prototype.getValue = function() {
					return this.eInput.value;
				};
				
				DatetimePicker.prototype.destroy = function(params) {
					//console.log("destroy");
				}
				
				DatetimePicker.prototype.isPopup = function() {
					return false;
				};
				
				return DatetimePicker;
			}
			, getFloatCellRenderer : function(params){							
				var html = "";
				var value = "";
				
				if (params.hasOwnProperty("value") && params.value !== "") {// 0 표시하기 위함
					value = String(params.value); 
				}
				
				if (params.colDef.valueFormatter !== undefined) {
					value = params.colDef.valueFormatter(params);
				} else if (params.colDef.valueGetter !== undefined) {
					value = params.colDef.valueGetter(params);
				} else {
					if ( params.colDef.hasOwnProperty("cellEditorParams") ) {
						let cellEditorParams = {}
						if ($.isFunction(params.colDef.cellEditorParams)) {
							cellEditorParams = params.colDef.cellEditorParams(params);
						} else {
							cellEditorParams = params.colDef.cellEditorParams;
						}
						
						if (cellEditorParams.hasOwnProperty("toFixed") && cellEditorParams.toFixed != "") {
							value = Number.parseFloat(params.value).toFixed(cellEditorParams.toFixed)
						}
					}
					
					value = GRID_COMPONENTS.formatNumber(value);
				}
				
				if (value == undefined || value == null)  {value = "";}
				
				if ( (typeof params.colDef.editable == "boolean" && params.colDef.editable) || ($.isFunction(params.colDef.editable) && params.colDef.editable(params)) ) {
					html = "<div class='inForm-writeNum'>" + value + "</div>";
				} else {
					html = value;
				}
				
				return html;
			}
			, getFloatCellEditor : function(){
	            function FloatCellEditor() {}
	
				FloatCellEditor.prototype.init = function (params) {
				    this.eInput = document.createElement('input');
				    this.eInput.setAttribute("type", "number");
					this.eInput.classList.add('ta-r');
				    this.eInput.style.height = '100%';
				    GRID_COMPONENTS.setNumberAttr(params, this.eInput);
				
					if (isCharNumeric(params.charPress)) {
						this.eInput.value = params.charPress;
					} else {
						if (params.value !== undefined && params.value !== null) {
							this.eInput.value = params.value;
						}
					}
						
				};
				
				FloatCellEditor.prototype.getGui = function () {
				    return this.eInput;
				};
				
				FloatCellEditor.prototype.afterGuiAttached = function () {
				    this.eInput.focus();
				};
				
				FloatCellEditor.prototype.getValue = function () {
				    return this.eInput.value;
				};
				
				FloatCellEditor.prototype.isPopup = function () {
				    return false;
				};
				
				return FloatCellEditor;
			}
			, getIntegerCellEditor : function(){
	            function IntegerCellEditor() {}

				IntegerCellEditor.prototype.init = function (params) {
				  this.eInput = document.createElement('input');
				  this.eInput.setAttribute("type", "number");
				  this.eInput.classList.add('ta-r');
				  this.eInput.style.height = '100%';
				  GRID_COMPONENTS.setNumberAttr(params, this.eInput);
				
				  if (isCharNumeric(params.charPress)) {
				    this.eInput.value = params.charPress;
				  } else {
				    if (params.value !== undefined && params.value !== null) {
				      this.eInput.value = params.value;
				    }
				  }
				
				  var that = this;
				  this.eInput.addEventListener('keypress', function (event) {
				    if (!isKeyPressedNumeric(event)) {
				      that.eInput.focus();
				      if (event.preventDefault) event.preventDefault();
				    } else if (that.isKeyPressedNavigation(event)) {
				      event.stopPropagation();
				    }
				  });
				
				  // only start edit if key pressed is a number, not a letter
				  var charPressIsNotANumber =
				    params.charPress && '1234567890'.indexOf(params.charPress) < 0;
				  this.cancelBeforeStart = charPressIsNotANumber;
				};
				
				IntegerCellEditor.prototype.isKeyPressedNavigation = function (event) {
				  return event.keyCode === 39 || event.keyCode === 37;
				};
				
				IntegerCellEditor.prototype.getGui = function () {
				  return this.eInput;
				};
				
				IntegerCellEditor.prototype.afterGuiAttached = function () {
				  this.eInput.focus();
				};
				
				IntegerCellEditor.prototype.isCancelBeforeStart = function () {
				  return this.cancelBeforeStart;
				};
				
				IntegerCellEditor.prototype.isCancelAfterEnd = function () {
				  var value = this.getValue();
				  return value.indexOf('007') >= 0;
				};
				
				IntegerCellEditor.prototype.getValue = function () {
				  return this.eInput.value;
				};
				
				IntegerCellEditor.prototype.destroy = function () {
				  // but this example is simple, no cleanup, we could  even leave this method out as it's optional
				};
				
				IntegerCellEditor.prototype.isPopup = function () {
				  // and we could leave this method out also, false is the default
				  return false;
				};
				
				return IntegerCellEditor;
			}
			, getTextCellRenderer : function(params){
				var html = "";
				var value = String(params.value||'');
				
				if (params.colDef.valueFormatter !== undefined) {
					value = params.colDef.valueFormatter(params);
				} else if (params.colDef.valueGetter !== undefined) {
					value = params.colDef.valueGetter(params);
				}
				
				if ( (typeof params.colDef.editable == "boolean" && params.colDef.editable) || ($.isFunction(params.colDef.editable) && params.colDef.editable(params)) ) {
					html = "<div class='inForm-write'>" + value + "</div>";
				} else {
					html = value;
				}
				
				return html;
			}
			, getTextCellEditor: function() {
				function TextCellEditor() {}
	
				TextCellEditor.prototype.init = function (params) {
				    this.eInput = document.createElement('input');
				    this.eInput.style.height = '100%';
				    this.eInput.style.width = '100%';
				
				    if (params.value !== undefined && params.value !== null) {
				        this.eInput.value = params.value;
				    }
				    
				    if (params.colDef.cellEditorParams) {
				    	if(params.colDef.cellEditorParams.maxLength) {
							this.eInput.maxLength = params.colDef.cellEditorParams.maxLength;;
						}
						
						if (params.colDef.cellEditorParams.upperCase == 'Y') {
							$(this.eInput).off("keyup change").on("keyup change", function(e) {
								$(this).val( ($(this).val()||'').toUpperCase());
							});	
						}
					} 
					
				    if (params.charPress) {
						this.eInput.value = params.charPress;
					}
				};
				
				TextCellEditor.prototype.getGui = function () {
				    return this.eInput;
				};
				
				TextCellEditor.prototype.afterGuiAttached = function () {
				    this.eInput.focus();
				};
				
				TextCellEditor.prototype.getValue = function () {
				    return this.eInput.value;
				};
				
				TextCellEditor.prototype.isPopup = function () {
				    return false;
				};
				
				return TextCellEditor;
			}
			, getYnCheckboxCellEditor: function() {
				function YnCheckboxCellEditor() {}
	
				YnCheckboxCellEditor.prototype.init = function (params) {
					var value = params.value||'';
					
				    this.eInput = document.createElement('input');
				    this.eInput.type = "checkbox";
				    this.eInput.classList.add('ag-input-field-input');
				    this.eInput.classList.add('ag-checkbox-input');
					this.eInput.style.height = '18px';
					this.eInput.style.margin = '10px 25px 10px -40px';
				    
				    if(value == "Y") {
						$(this.eInput).prop("checked", true);
					}

					/*
					this.eContainer = document.createElement('div');
					this.eContainer.classList.add('ag-wrapper');
					this.eContainer.classList.add('ag-input-wrapper');
					this.eContainer.classList.add('ag-checkbox-input-wrapper');
					this.eContainer.appendChild(this.eInput);
					*/				 
				};
				
				YnCheckboxCellEditor.prototype.getGui = function () {
				    return this.eInput;
				};
				
				YnCheckboxCellEditor.prototype.afterGuiAttached = function () {
					if(this.eInput.checked) {
						this.eInput.checked = false;
					} else {
						this.eInput.checked = true;
					}
				    this.eInput.focus();
				};
				
				YnCheckboxCellEditor.prototype.getValue = function () {
				    return this.eInput.checked?"Y":"N";
				};
				
				YnCheckboxCellEditor.prototype.isPopup = function () {
				    return false;
				};
				
				return YnCheckboxCellEditor;
			}
			, getInputSearchCellRenderer: function(params) {	
				var html = "";
				var value = String(params.value||''); 	
				
				if ( (typeof params.colDef.editable == "boolean" && params.colDef.editable) || ($.isFunction(params.colDef.editable) && params.colDef.editable(params)) ) {
					html = "<div class='inForm-search'>" + value + "</div>";
				} else {
					html = value;
				}
				
				return html;
			}
			, getInputSearchCellEditor: function () {
				function InputSearchCellEditor() {}

				InputSearchCellEditor.prototype.init = function (params) {

					this.container = document.createElement('div');
				    this.container.classList.add("inForm-search");

				 	// input
				    this.eInput = document.createElement('input');
				    this.eInput.type = "text";
				    this.eInput.classList.add("input");
					this.eInput.readOnly = (params.colDef.readonly === undefined || params.colDef.readonly === null? true: params.colDef.readonly);
					this.eInput.value = params.value ||'';
					
				    this.container.appendChild(this.eInput);

				    // reset button
				    this.btnReset = document.createElement('a');
					this.btnReset.classList.add("btn","btn-del","clear");
				    this.btnReset.addEventListener('click', () => {
						if ( params.colDef.reset === undefined) {
				    		this.eInput.value = params.value;
					    } else {
					    	params.colDef.reset(params);
					    }
					})

					this.container.appendChild(this.btnReset);

				    // search button
					this.btnSearch = document.createElement('a');
					this.btnSearch.href = "#";
				    this.btnSearch.classList.add("btn","btn-search");
				    if ( params.colDef.search !== undefined) {
				    	this.btnSearch.addEventListener('click', () => {
							params.colDef.search(params);
						})
					}
					
					this.container.appendChild(this.btnSearch);

				};

				InputSearchCellEditor.prototype.getGui = function () {
					return this.container;
				};

				InputSearchCellEditor.prototype.afterGuiAttached = function () {
				    this.eInput.focus();
				};

				InputSearchCellEditor.prototype.getValue = function () {
				    return this.eInput.value;
				};

				InputSearchCellEditor.prototype.isPopup = function () {
				    return false;
				};

				return InputSearchCellEditor;
			}
			, getSelectCellRenderer: function () {
				function SelectCellRenderer() {}

				SelectCellRenderer.prototype.init = function (params) {
					this.eContainer = document.createElement('div');
					this.eContainer.classList.add("inForm-select1");
					
					this.eGui = document.createElement('select');
					this.eGui.classList.add("select1");
					this.eContainer.appendChild(this.eGui);
					
					var opt = this.getOptionList(params);
					$(this.eGui).append("<option value=''></option>");
					$(this.eGui).append($("#"+ opt.templateId).render(opt.list));
					$(this.eGui).val(params.data[params.column.colId]);
					
				    this.eGui.addEventListener('change', () => {
						this.change(params);
					});					
				};

				SelectCellRenderer.prototype.getGui = function (params) {
					return this.eContainer;
				};
				
				SelectCellRenderer.prototype.getValue = function () {
				    return $(this.eGui).val();
				};
				
				SelectCellRenderer.prototype.refresh = function (params) {
//console.log("[SelectCellRenderer.Refresh] : ", params.colDef.field, $(this.eGui).val()+" → "+params.data[params.colDef.field], params.data.IgnoreRefresh, params);
					/* FI > Master > Additional Authority: Origin에서 다른 타입으로 변경 시 cellRendererSelector를 실행하기 위해 false를 반환 */
					if (params.data.IgnoreRefresh == true) {return false;}
					
					// 붙여넣기한 경우는 <select>의 해당 옵션 선택이 필요함.
					var val = params.value;			// newValue
					var eVal = $(this.eGui).val();	// oldValue
					if ( val == eVal ) return true;
					
					var opt = this.getOptionList(params);
					if (opt.templateId !== 'option3-tmpl') {
						opt.list.filter(item => (item.CODE == params.value || item.CODE_NM == params.value || "["+item.CODE+"] "+item.CODE_NM == params.value)).forEach(function(item, idx, arr){
							val= item.CODE;
						});
					}
					if ( val == eVal ) return true;
					
					$(this.eGui).val(val);
					this.change(params);
					 
					return true;
				};
				
				SelectCellRenderer.prototype.getOptionList = function(params) {
					var optionList = [];
					if ($.isFunction(params.colDef.optionList)) {
						optionList = params.colDef.optionList(params)
					} else if (params.colDef.optionList !== undefined) {
						optionList = params.colDef.optionList;
					} else if ($.isFunction(params.colDef.cellEditorParams)) {
						optionList = params.colDef.cellEditorParams(params).values;
					}
					
					var templateId = "";
					if (params.colDef.templateId) {
						templateId = params.colDef.templateId;
					} else if ($.isFunction(params.colDef.cellEditorParams)) {
						templateId = params.colDef.cellEditorParams(params).templateId;
					} 
					if (!templateId) {
						templateId = (optionList && optionList.length > 1 && (typeof optionList[0] == "object")) ? "option-tmpl" : "option3-tmpl";					
					}
					
					return {list: optionList, templateId: templateId};
				}
				
				SelectCellRenderer.prototype.getText = function(params) {
					var txt = "";
					
					if (params.colDef.valueFormatter !== undefined) {
						txt = params.colDef.valueFormatter(params);
					} else if (params.colDef.valueGetter !== undefined) {
						txt = params.colDef.valueGetter(params);
					} else {
						var opt = this.getOptionList(params);
						if (opt.templateId !== 'option3-tmpl') {
							opt.list.filter(item => item.CODE == params.value).forEach(function(item, idx, arr){
								txt = opt.templateId === 'option-tmpl'? item.CODE_NM : "["+item.CODE+"] "+item.CODE_NM ;
							});
						}
						
						txt = txt || params.value ;
				    }

					return txt || '';
				}
				
				SelectCellRenderer.prototype.change = function(params) {
//console.log("SelectCellRenderer change", params.colDef.field, params.data[params.colDef.field], params);					
					if (params.colDef.change !== undefined) {
						params.colDef.change(params, this.eGui.value);
					} else if (params.colDef.valueSetter !== undefined) {
						params.node.setDataValue(params.colDef.field, this.eGui.value);
						//params.colDef.valueSetter(params);
					} else {
			    		params.data[params.colDef.field] = this.eGui.value;
				    }
					
				}
				
				return SelectCellRenderer;
			}
			, getFakeSelectCellRenderer: function () {
				function FakeSelectCellRenderer() {}
				
				FakeSelectCellRenderer.prototype.init = function (params) {
					this.eGui = document.createElement('div');
					this.eGui.classList.add("inForm-select1");
					
					this.refresh(params);
				};
				
				FakeSelectCellRenderer.prototype.getGui = function () {
					return this.eGui;
				};
				
				FakeSelectCellRenderer.prototype.refresh = function (params) {
					var txt = "";
					if ( params.colDef.valueFormatter !== undefined) {
						txt = params.colDef.valueFormatter(params);
					} else if ( params.colDef.valueGetter !== undefined) {
						txt = params.colDef.valueGetter(params);
					} else {
						txt = params.value || '';
				    }
				
					this.eGui.innerText = txt;

					return true;
				}
				
				return FakeSelectCellRenderer
			}
			, getSelect2CellRenderer : function(params){
				var html = "";
				var value = String(params.value||'');
				
				let cellEditorParams = {} ;
				if ($.isFunction(params.colDef.cellEditorParams)) {
					cellEditorParams = params.colDef.cellEditorParams(params) ;
				} else if (params.colDef.cellEditorParams !== undefined) {
					cellEditorParams = params.colDef.cellEditorParams;
				} 
				
				if ( cellEditorParams.hasOwnProperty("renderField") && cellEditorParams.renderField != "id" ) { // renderField: id, text, [id]text					
					let text = "";
					let colId = params.colDef.field;						
					if (cellEditorParams.values != undefined) {
						cellEditorParams.values.filter(item => item.id == value).forEach(function(item, idx, arr){
							text = item.text || '';
						})
					} else if ( params.data.hasOwnProperty(colId+"_NM") ) {					
						text = params.data[colId+"_NM"] || '';
					}
					
					if (!text) {
						value = value;
					} else if ( cellEditorParams.renderField == "text" ) {
						value = text;
					} else {
						value = GRID_COMPONENTS.makeCodeName(value, text);
					}
				}
				
				if ( (typeof params.colDef.editable == "boolean" && params.colDef.editable) || ($.isFunction(params.colDef.editable) && params.colDef.editable(params)) ) {
					html = "<div class='inForm-select2'>" + value + "</div>";
				} else {
					html = value;
				}
				
				return html;
			}
			, getSelect2CellEditor: function () {
				/*
					cellEditorParams : 
					{ 
						values: [{id:'id-1',text:'text-1'}],
						minimumResultsForSearch: 'Infinity'
					}
				*/
				function Select2CellEditor() {}

				Select2CellEditor.prototype.init = function (params) {
					
					this.eContainer = document.createElement('div');
				    this.eContainer.classList.add("inForm-select2");
				    
					this.eGui = document.createElement('select');
					this.eGui.classList.add("select2");
					
					this.eContainer.appendChild(this.eGui);
					
					this.params = params;
					
				};

				Select2CellEditor.prototype.getGui = function () {		
					return this.eContainer;
				};
				
				Select2CellEditor.prototype.afterGuiAttached = function () {	
					var editorParams = {};
					
					if ($.isFunction(this.params.colDef.cellEditorParams)) {
						editorParams = this.params.colDef.cellEditorParams(this.params) ;
					} else if (this.params.colDef.cellEditorParams !== undefined) {
						editorParams = this.params.colDef.cellEditorParams;
					} 
					
					$(this.eGui).select2({
							placeholder: '',
			                closeOnSelect: true,
			                theme: "single",
			                tags: editorParams.tags||false,
			                data: editorParams.values,
			                minimumResultsForSearch: editorParams.minimumResultsForSearch || '1',
			                matcher: function(params, data) {
								        if ($.trim(params.term) === '') {
								          return data;
								        }
								
								        if (typeof data.text === 'undefined') {
								          return null;
								        }
								
								       	var text = data.text.toUpperCase();
								       	var terms = params.term.toUpperCase();
								        if (text.indexOf(terms) > -1) {
								          var modifiedData = $.extend({}, data, true);
								          return modifiedData;
								        }
								
								        return null;
								    }
					});
					
					var value = this.params.value || '';						
					$(this.eGui).val(value);
					    
					$(this.eGui).select2('open');
				};
								
				Select2CellEditor.prototype.getValue = function () {
				    return $(this.eGui).val();
				};
								
				Select2CellEditor.prototype.destroy = function(params) {
					$(this.eGui).select2('close');
	            }
	            
				return Select2CellEditor;
			}
			, getSelect2LargeDataCellEditor: function () {
				/*
					cellEditorParams : 
					{ 
						values: [{id:'id-1',text:'text-1'}],
						minimumResultsForSearch: 'Infinity'
					}
				*/
				function Select2CellEditor() {}

				Select2CellEditor.prototype.init = function (params) {
				
					this.eContainer = document.createElement('div');
				    this.eContainer.classList.add("inForm-select2");
				    
					this.eGui = document.createElement('select');
					this.eGui.classList.add("select2");
					
					this.eContainer.appendChild(this.eGui);
					
					this.params = params;

				};

				Select2CellEditor.prototype.getGui = function () {		
					return this.eContainer;
				};
				
				Select2CellEditor.prototype.afterGuiAttached = function () {	
					var editorParams = {};
					
					if ($.isFunction(this.params.colDef.cellEditorParams)) {
						editorParams = this.params.colDef.cellEditorParams(this.params) ;
					} else if (this.params.colDef.cellEditorParams !== undefined) {
						editorParams = this.params.colDef.cellEditorParams;
					}
					
					editorParams.value = this.params.value || '';
					editorParams.timer = null;
					editorParams.charPress = this.params.charPress || '';
					$(this.eGui).select2({
							placeholder: '',
			                closeOnSelect: true,
			                theme: "single",
			                tags: editorParams.tags||false,
							minimumInputLength: editorParams.minimumInputLength || '0',
			                ajax: {
					            delay: 200,
					            transport: function(params, success, failure) {
					                let pageSize = 100;
					                let term = (params.data.term || '').toLowerCase();
					                let page = (params.data.page || 1);
					
					                if (editorParams.timer)
					                    clearTimeout(editorParams.timer);

					                editorParams.timer = setTimeout(function(){
					                    timer = null;
					                    let results = editorParams.values.filter(function(f){
						                        return f.id.toLowerCase().includes(term) || f.text.toLowerCase().includes(term);
						                    });
					
					                    let paged = results.slice((page -1) * pageSize, page * pageSize);
					
					                    let options = {
					                        results: paged,
					                        pagination: {
					                            more: results.length >= page * pageSize
					                        }
					                    };
					                    success(options);
					                }, params.delay);
					            }
					        }
					});
					
					var value = editorParams.value;
					$(this.eGui).val(value).trigger('change');
					$(this.eGui).attr("initValue", value);

					$(this.eGui).select2('open');
				};
								
				Select2CellEditor.prototype.getValue = function () {
					var value = $(this.eGui).val() || '';
					var initValue = $(this.eGui).attr("initValue") || ''; 
					
					if(value == '') {
						value = initValue;
					}
					
				    return value;
				};

				Select2CellEditor.prototype.destroy = function(params) {
					$(this.eGui).select2('close');
	            }
	            
				return Select2CellEditor;
			}
			, getSelect2AjaxCellEditor: function () {
				/*
					cellEditorParams : 
					{ 
						values: [{id:'id-1',text:'text-1'}],
						minimumResultsForSearch: 'Infinity'
					}
				*/
				function Select2CellEditor() {}

				Select2CellEditor.prototype.init = function (params) {
					this.eContainer = document.createElement('div');
				    this.eContainer.classList.add("inForm-select2");
				    
					this.eGui = document.createElement('select');
					this.eGui.classList.add("select2");
					
					this.eContainer.appendChild(this.eGui);
					
					this.params = params;
					
				};

				Select2CellEditor.prototype.getGui = function () {		
					return this.eContainer;
				};
				
				Select2CellEditor.prototype.afterGuiAttached = function () {	
					var editorParams = {};
					
					if ($.isFunction(this.params.colDef.cellEditorParams)) {
						editorParams = this.params.colDef.cellEditorParams(this.params) ;
					} else if (this.params.colDef.cellEditorParams !== undefined) {
						editorParams = this.params.colDef.cellEditorParams;
					}

					editorParams.rowsPerPage = 500;
					editorParams.paging = true;
					editorParams.value = this.params.value || '';
					
					$(this.eGui).select2({
							placeholder: '',
			                closeOnSelect: true,
			                theme: "single",
			                tags: editorParams.tags||false,
			                ajax: {
							    url: editorParams.url,
							    delay: 100,
            					cache: false,
							    data: function (params) {
									var query = $.extend({}, editorParams.params, {
										searchKeyword: params.term,
										searchWord :  params.term,
										page: params.page || 1,
										rowsPerPage: editorParams.rowsPerPage,
										type: 'GRID'
									});
							
							      return query;
							    },
							    processResults: function (data, params) {
							    	params.page = params.page || 1;
							    	
							    	var result = [];
							    	var totalCount = 0;
							    	var page = params.page;
							    	var rowsPerPage = editorParams.rowsPerPage;
							    	
							    	if(data != null && data.length > 0) {
							    		totalCount = data[0].TOTAL_COUNT;
							    		rowsPerPage = data[0].ROWS_PER_PAGE;
							    	} 
							    	
							    	data.forEach(function(item, idx, arr){ 
							    		result.push({id: item[editorParams.id], text: GRID_COMPONENTS.makeCodeName(item[editorParams.id],item[editorParams.text])});
				            		});

							      	return {
							        	results: result,
							        	pagination: {
							        		more: editorParams.paging && ((page * rowsPerPage) < totalCount)
							        	},
							      	};
							    }
						   }
					});
					
					var value = editorParams.value;						
					$(this.eGui).val(value).trigger('change');
					$(this.eGui).attr("initValue", value);
					    
					$(this.eGui).select2('open');
				};
								
				Select2CellEditor.prototype.getValue = function () {
					var value = $(this.eGui).val() || '';
					var initValue = $(this.eGui).attr("initValue") || ''; 
					
					if(value == '') {
						value = initValue;
					}
					
				    return value;
				};
								
				Select2CellEditor.prototype.destroy = function(params) {
					$(this.eGui).select2('close');
	            }

				return Select2CellEditor;
			}
			, makeCodeName(pCode, pCodeNm) {
				var code = pCode || "";
				var codeNm = pCodeNm|| "";
				
				if(code == undefined || code == "undefined") {
					code = "";
				}
				
				if(code == "" || code == "*" || code == " ") {
					return code;
				}
				
				if(codeNm == null) {
					return code;
				}
				
				var text = "["+ code + "] ";
				codeNm = codeNm.replaceAll(text, "");
				
				return text + codeNm;
			}
			, suppressEvent(params) {
				return params.event.key === "Backspace";
       		}
       		, backspaceEvent(e) {						
					if (e.event) {
						var keyDown = e.event.key;
						if (keyDown === 'Backspace') {
							var cellRanges = e.api.getCellRanges();
							if (cellRanges) {
						    	cellRanges.forEach(function (range) {
									var startRow = Math.min(range.startRow.rowIndex, range.endRow.rowIndex);
									var endRow = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);
									
									for (var rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
									  range.columns.forEach(function (column) {
										  var rowModel =  e.api.getModel();
										  var rowNode = rowModel.getRow(rowIndex);
										  
										  var editable = column.colDef.editable;
										  if(typeof editable == "function") {
										  	editable = column.colDef.editable(rowNode);
										  }
										  
										  if(editable) {
										  	rowNode.setDataValue(column.colId, '');
										  }
											  									
									  });
									}
						    	});

						}
					}
				}      		
       		}
			, formatNumber(params){
				var regexp = /\B(?=(\d{3})+(?!\d))/g;
				if(params.value) {
					return Math.floor(params.value).toString().replace(regexp, ',');
				} else if (typeof params === "number") {
					return Math.floor(params).toString().replace(regexp, ',');
				} else if (typeof params === "string") {
					return params.replace(regexp, ',');
				} else {
					//console.log("formatNumber에 type을 추가하세요");
					//console.log(typeof params);
				}
			}
			// 소수점 4자리에서 반올림하고 소수점 3자리까지 표시
			, formatNumberToFixed3(params){
				if(params.value) {
					var regexp = /\B(?=(\d{3})+(?!\d))/g;
					return (Math.round(params.value*1000)/1000).toString().replace(regexp, ',');
				}
			}
			// 반올림 없이 전체 표시하고 천단위 구분자만 표시
			, formatNumberToFixed3_1(params){
				if(params.value) {
					var regexp = /\B(?=(\d{3})+(?!\d))/g;
					return (params.value).toString().replace(regexp, ',');
				}
			}
			, padToFixed2: function(params) {
				// 소수점 2자리까지 0으로 채움 (ex: 2.3 => 2.30)
				var restul = Number.parseFloat(Math.round(params.value * 100) / 100).toFixed(2);
				if(isNaN(restul)){
					return "";
				}
				return restul;
			}
			, padToFixed3: function(params) {
				// 소수점 3자리까지 0으로 채움 (ex: 2.3 => 2.300)
				var restul = Number.parseFloat(Math.round(params.value * 1000) / 1000).toFixed(3);
				if(isNaN(restul)){
					return "";
				}
				return restul;
			}
  	        , checkNullOfColumnDefs(COLUMNDEFS) {
  	        	var _this = this;
  	        	
  	        	_this.checkNullOfChildren(COLUMNDEFS);
  	        }
  	        , checkNullOfChildren(colDef) {
  	        	var _this = this;
  	        	
  	        	colDef.forEach(function(v){
  	        		if(v) {
						for (var key in v) {
							var value = v[key];
							if(key == "hide" && value == undefined) {
								v[key] = false;
							}
							else if(value == null){
								delete v[key]
							}
	
							if(key == "children") {
								_this.checkNullOfChildren(v[key]);
							}
						}	
					}														
			 	});	
  	        }
			, rebuildColDefByFilter(defColDef, setting, filter) {
				var def = JSON.parse(JSON.stringify(defColDef));
				var settingColDef = JSON.parse(setting.COLUMN_DEFS);
				var list = [];
				var _this = this;
				
			 	if(Object.keys(settingColDef).length > 0) {
			 		settingColDef.forEach(function(group) {
						list.push(group);
						if(group.children) {
							group.children.forEach(function(column){
								list.push(column);
							});								
						}
						
                    });
                    
                    _this.rebuild(def, list);
			 	}
			 	
			 	filter.data.COLUMN_DEFS = def;    					
    			filter.data.FILTER_MODEL = JSON.parse(setting.FILTER_MODEL);
			}
			, rebuild(def, list) {
				var _this = this;
				var attrs = ['width','flex','hide','pinned','sort','sortIndex','rowGroup','rowGroupIndex','pivot','pivotIndex','aggFunc'];
				
			 	def.forEach(function(column) {			 	
			 		if(column) {
			 			column.hide = false;
						
						var gkey = "";
						if(column.groupId != undefined) {
							gkey = column.groupId;
						} else if (column.colId != undefined) {
							gkey = column.colId;
						} else if (column.field != undefined) {
							gkey = column.field;
						}
						
						var s = list.filter(item => (item.groupId == gkey || item.colId == gkey || item.field == gkey));	 	
						if(s.length > 0) {
							s.forEach(function(v){
								for (var key in v) {
									if(attrs.indexOf(key)>=0) {
										column[key] = v[key];
									}
								}															
						 	});	
						} 
						
						if(column.hasOwnProperty("children")) {
							_this.rebuild(column.children, list);
						}
					}
                });
			}		
			, setNumberAttr: function (params, eInput) {
				if (!params.colDef.hasOwnProperty("cellEditorParams") ) return ;
					
				var _cellEditorParams ;
				if ($.isFunction(params.colDef.cellEditorParams)) {
					_cellEditorParams = params.colDef.cellEditorParams(params);
				} else {
					_cellEditorParams = params.colDef.cellEditorParams;
				}
			
				Object.keys(_cellEditorParams).forEach(function(key, idx, arr){
					eInput.setAttribute(key, _cellEditorParams[key]);
				});
			
				$(eInput).off("input").on("input", function(e){
					var val = this.value;
					var chg = false;
					
					if (this.hasAttribute("min")) {
						var min = Number(this.getAttribute("min"));
						if ( Number(val) < min ) {
							val = min;
							chg = true;
						}
					}

					if (this.hasAttribute("max")) {
						var max = Number(this.getAttribute("max"));
						if ( Number(val) > max ) {
							val = max;
							chg = true;
						}
					}
			
					if (this.hasAttribute("scale")) { // 소수점 이하 자리수
						var scale = Number(this.getAttribute("scale"));
						// var reg = new RegExp(".\\d{"+ (scale+1) +",}");
						var reg = new RegExp("\\.\\d{"+ (scale+1) +",}");
						if (reg.test(String(val))) {
							//val = parseFloat(val).toFixed(scale); 
							// val = Math.floor(Number(val) * 100) / Math.pow(10,scale);
							val = Math.floor(Number(val) * Math.pow(10,scale)) / Math.pow(10,scale);
							chg = true;	
						}
					}
					
					if (this.hasAttribute("maxLength")) {
						var maxLength = Number(this.getAttribute("maxLength")); 
						if ( String(val).length > maxLength) {
							val = String(val).substring(0, maxLength);
							var reg = new RegExp("\\.$");
							if(reg.test(String(val))){
								// 마지막 소수점 제거
								val = String(val).replace(".","");
							}
							chg = true;
						}
					}
										
					if (chg) {
						this.value = val;
					}					
					
				});
			}
			, gridOptions: function(opt) {
				if (!opt) { opt = {} };
				
				this.gridOptions= Object.assign({
					defaultColDef: {
						suppressFilter: true
						, defaultToNothingSelected: true
						, sortable:true
						, resizable: true
				        , floatingFilter: false
				        , pivotMode: true
				        , enableValue: true
				        , enablePivot: true
				        , filter: true
				        , filterParams: {
			                buttons: ['reset', 'apply']
        					, excelMode: 'windows'
							, closeOnApply: true
			            }
					}
					, icons: {
				    	columnGroupOpened: '<i class="far fa-minus-square"/>'
				    	, columnGroupClosed: '<i class="far fa-plus-square"/>'
					}	
					, components: {     
						datePicker: GRID_COMPONENTS.getYyyyMmDdPicker()
						, datetimePicker: GRID_COMPONENTS.getYyyyMmDdHhMiPicker()
						, timePicker: GRID_COMPONENTS.getHhMiPicker()
						, floatCellEditor: GRID_COMPONENTS.getFloatCellEditor()
						, integerCellEditor: GRID_COMPONENTS.getIntegerCellEditor()
						, inputSearchCellEditor: GRID_COMPONENTS.getInputSearchCellEditor()
						, select2CellEditor: GRID_COMPONENTS.getSelect2CellEditor()
						, textCellEditor: GRID_COMPONENTS.getTextCellEditor()
						, codeCellRenderer : GRID_COMPONENTS.getCodeCellRenderer
						, dateRenderer: GRID_COMPONENTS.getYyyyMmDdHhMiCellRenderer
						, timeRender: GRID_COMPONENTS.getHhMiCellRenderer
						, ynCheckboxCellRenderer: GRID_COMPONENTS.getYnCheckboxCellRenderer
						, ynCheckboxEditableRenderer: GRID_COMPONENTS.getYnCheckboxEditableRenderer()
						, selectCellRenderer: GRID_COMPONENTS.getSelectCellRenderer()
						, fakeSelectCellRenderer: GRID_COMPONENTS.getFakeSelectCellRenderer()
						, textCellRenderer: GRID_COMPONENTS.getTextCellRenderer
						, inputSearchCellRenderer: GRID_COMPONENTS.getInputSearchCellRenderer
						, floatCellRenderer: GRID_COMPONENTS.getFloatCellRenderer
						, select2CellRenderer: GRID_COMPONENTS.getSelect2CellRenderer
					}					
					, columnTypes : new GRID_COMPONENTS.columnTypes(opt.editable, opt.cellClass)
					, autoGroupColumnDef: {
					    width: 250
					}
					, enableRangeSelection: true
	                , animateRows: true
					, rowSelection: 'multiple'
					, rowMultiSelectWithClick:true
					, pagination: false
					, paginationPageSize: 10
					, suppressMenuHide: true
					, suppressAggFuncInHeader: true
					, headerHeight : 30
					, rowHeight: 20 
					, sideBar: { toolPanels: ['columns'] }
					, tooltipShowDelay:0
		            , suppressRowClickSelection:false
		            , suppressRowDeselection:false
		            , suppressCsvExport:true
					, overlayNoRowsTemplate: $("#no_data-tmpl").render([1]) // 헤더 row 수
					, excelStyles: [
			                {
								id: 'header'
								, alignment: {
									horizontal: 'Center'
								}
								, interior: {
									color: '#F9E911'
									, pattern: 'Solid'
			                    }
								, font: {
									bold: true
			                    }
			                    , borders: {
									borderBottom: {
										color: '#000000'
										, lineStyle: 'Continuous'
										, weight: 1
									}
			                   		, borderLeft: {
										color: '#000000'
										, lineStyle: 'Continuous'
										, weight: 1
									}
			                    	, borderTop: {
										color: '#000000'
										, lineStyle: 'Continuous'
										, weight: 1
									}
			                    	, borderRight: {
										color: '#000000'
										, lineStyle: 'Continuous'
										, weight: 1
									}
								}
							}
		                    , {
		                        id: 'stringType'
		                        , dataType: 'string'
			                    , alignment: {
			                        horizontal: 'Left'
			                    }
		                    }
						]
					, onCellValueChanged: function (params) {
			        	if(!params.node.isSelected()) {
							params.node.setSelected(true);
						}
			        }						
				}, opt);
				
				
			}
			, columnTypes: function(editable, cellClass) {
				this.def = {
					editable: editable || function(params) {
						return false;
					}, 
					cellClass: cellClass || function(params) {
						result = [];
			
						if ( (typeof params.colDef.editable == "boolean" && params.colDef.editable) || ($.isFunction(params.colDef.editable) && params.colDef.editable(params)) ) {
							result.push("cell-form1");
						}
			
						let isNum = false; 
						let arrType = Array.isArray(params.colDef.type)? params.colDef.type : (params.colDef.type ||'').split(",") ;
						for (type of arrType) {
							if ( ["int","float","percent"].indexOf(type) > -1 ) {
								isNum = true;
								break;
							} 
						}
						
						if ( isNum ) {
							result.push("ag-right-aligned-cell");
						} else {
							result.push("stringType");
						} 
						
						if ( arrType.indexOf('btn') > -1 ) {
							result.push("ag-btnbox");
						}
						
						if ( arrType.indexOf('ynCheckbox') > -1 ) {
							result.push("ta-c");
						}

						return result ;
					}
				};
				
				this.text= $.extend({}, this.def, {
					cellEditor: 'textCellEditor',		
					cellRenderer: 'textCellRenderer',
				});
				
				this.upperCase = $.extend({}, this.text, {
					cellEditorParams: {upperCase:"Y"},
					valueSetter : function(params) {
						params.data[params.colDef.field] = (params.newValue || '').toUpperCase(); 
						return true;
		            },
				});
				
				this.largeText= $.extend({}, this.def, {
					cellEditor: 'agLargeTextCellEditor',		
					cellRenderer: 'textCellRenderer',
					cellEditorParams: {
		            	maxLength: 400,
		                maxByte: 1000,
		                rows:5,
		                cols:50
		            },
					//suppressKeyboardEvent: GRID_COMPONENTS.suppressEvent,
				});				
				
				this.int= $.extend({}, this.def, {
					filter: 'agNumberColumnFilter',
					cellEditor: 'integerCellEditor',
					cellRenderer: 'floatCellRenderer',
				});
								
				this.float= $.extend({}, this.def, {
					filter: 'agNumberColumnFilter',
					cellEditor: 'floatCellEditor',
					cellRenderer: 'floatCellRenderer',
				});
			
				this.percent= $.extend({}, this.float, {
					valueFormatter: function(params) {
						if ( params.value ) {
							return params.value + '%';
						}
					},		
				})
				
				this.date= $.extend({}, this.def, {
					cellRenderer: 'dateRenderer',
					cellEditor: 'datePicker',
				});
				
				this.datetime= $.extend({}, this.date, {
					cellEditor: 'datetimePicker',
				});
				
				this.time= $.extend({}, this.date, {
					cellRenderer: 'timeRender',
					cellEditor: 'timePicker',
				});
				
				this.select2= $.extend({}, this.def, {
					cellEditor: 'select2CellEditor',
					cellRenderer: 'select2CellRenderer',
					valueGetter : function(params) {
						let colId = params.colDef.field;
						
						let cellEditorParams = {} ;
						if ($.isFunction(params.colDef.cellEditorParams)) {
							cellEditorParams = params.colDef.cellEditorParams(params) ;
						} else if (params.colDef.cellEditorParams !== undefined) {
							cellEditorParams = params.colDef.cellEditorParams;
						} 
						
						let text = "";
						if (cellEditorParams.values != undefined) {
							cellEditorParams.values.filter(item => item.id == params.data[colId]).forEach(function(item, idx, arr){
								text = item.text
							})
						} else {
							text = GRID_COMPONENTS.makeCodeName(params.data[colId], params.data[colId+"_NM"]);
						}
						
						return text;
					},
				});
				
				this.ynCheckbox = $.extend({}, this.def, {
					cellRendererSelector: function(params) {
						if ( (typeof params.colDef.editable == "boolean" && params.colDef.editable) || ($.isFunction(params.colDef.editable) && params.colDef.editable(params)) ) {
							return { component : 'ynCheckboxEditableRenderer' }
						} else {
							return { component : 'ynCheckboxCellRenderer' }
						}
					}	
				});
				
				this.codeName= $.extend({}, this.def, {
					valueGetter: function(params) {
						let colId = params.colDef.field; 
						
						let cd = String(params.data[colId]);
						if ( params.colDef.removeStartsWith0 == true ) {
							cd = glp_VendorNm(cd);
						}
						
						return GRID_COMPONENTS.makeCodeName(cd, params.data[colId+"_NM"]);
					}
				});
				
				this.btn= $.extend({}, this.def, {
					cellEditor: undefined,							
				});

			}
			, getColorSelectEditor: function () {
				function ColorSelectEditor() {}

				ColorSelectEditor.prototype.init = function (params) {
					this.params = params;
					let thisText = "";
					let thisCode = "";

					if(typeof params.value === 'string'){ //value
						if(params.valueFormatted){
							thisText = params.valueFormatted;
							thisCode = params.value;
						}
					}else if(typeof params.value === 'object'){ //리스트값
						let object = params.value;
						thisText = object.value;
						thisCode = object.code;
					}

					this.eGui = document.createElement('span');
					this.eGui.style = "width:100%";
					this.div = document.createElement('div');
					this.div.style = `height: 15px; background-color: ${thisCode}; border-radius: 17px; width: 15px; display: inline-block; margin-top: 10px; margin-right:5px;`;
					this.eGui.appendChild(this.div);
					var jbBtnText = document.createTextNode( thisText );
					this.eGui.appendChild(jbBtnText);

					this.eGui.value = thisCode ||'';

					this.eGui.addEventListener('click', () => {
						this.eGui.value = this.params.value ||'';
					});
				};

				ColorSelectEditor.prototype.getGui = function () {
					return this.eGui;
				};

				ColorSelectEditor.prototype.refresh = function () {
					return false;
				};

				ColorSelectEditor.prototype.getValue = function () {
					return this.eGui.value;
				};
				return ColorSelectEditor;
			}
			, excelStyles: [
					{ 
						id: 'header',
						alignment: {horizontal: 'Center'},
						interior: {color: '#F9E911', pattern: 'Solid'}, 
						font: {bold: true}, 
						borders: {
							borderBottom: {color: '#000000', lineStyle: 'Continuous', weight: 1}, 
							borderLeft: {color: '#000000', lineStyle: 'Continuous', weight: 1}, 
							borderTop: {color: '#000000', lineStyle: 'Continuous', weight: 1},
							borderRight: { color: '#000000', lineStyle: 'Continuous', weight: 1}
						}
					},
					{
		                id: 'stringType', 
		                dataType: 'string', 
		                alignment: { horizontal: 'Left'},
		            },
		            {
						id: 'ag-center',
						dataType: 'string',
						alignment: { horizontal: 'Center' }
					},
					{
						id: 'ag-right-aligned-cell',
						alignment: { horizontal: 'Right' }
					},
					{
						id: 'cell-type1',
						interior: { color: '#D6E7DD', pattern: 'Solid' }
					},
					{
						id: 'cell-type2',
						interior: { color: '#FDF2D2', pattern: 'Solid' }
					},
					{
						id: 'cell-type3',
						interior: { color: '#E3F1BE', pattern: 'Solid' }
					},
					{ 
						id: 'cell-form1', 
					  	dataType: 'string',
	                    alignment: { horizontal: 'Left' },
	                    interior: { color: '#eeeeee', pattern: 'Solid' }			                    
	                },
	                { 
	                	id: 'ratio',
	                  	numberFormat: { format: '##0%' }		                    
	                },
	                { 
	                	id: 'inputCell',
	                	interior: {	color: '#eeeeee', pattern: 'Solid' }			                    
			        }
	            ]
	    };	 

		window.GRID_COMPONENTS = GRID_COMPONENTS;
	})();
	
function getCellEditorParamValues(code){
	function codeSort(a, b){
		if(a.codeName > b.codeName) {
		    return 1; 
		}

		if(a.codeName < b.codeName) {
            return -1; 
        }
        return 0; 
	}
	var list = HTGF.UTILS.getCodes(code).sort(codeSort).map(function(element){
		return element.code;
    });
    return list;
}
	
function getCharCodeFromEvent(event) {
  event = event || window.event;
  return typeof event.which == 'undefined' ? event.keyCode : event.which;
}

function isCharNumeric(charStr) {
  return !!/\d/.test(charStr);
}

function isKeyPressedNumeric(event) {
  var charCode = getCharCodeFromEvent(event);
  var charStr = String.fromCharCode(charCode);
  return isCharNumeric(charStr);
}
// CDBM gap over short
function gapCellClassRules() {
	return {
		//CSS CLASS별 할당
		'cell-error1': (params) => params.value !== 0,
	};
}
function cdbmCurrencyFormatter(params) {
	//return '£' + formatNumber(params.value);
	return  cdbmFormatNumber( params.value?params.value:0);
}

function cdbmFormatNumber(number) {
	return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}