/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var FRCMixin = require('./mixin');
var Row = require('./row');

var RadioGroup = React.createClass({

    mixins: [Formsy.Mixin, FRCMixin],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        return {
            type: 'radio-inline',
            label: '',
            help: null,
            wrap: true
        };
    },

    changeCheckbox: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    changeRadio: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    checkboxControls: function() {
        var _this = this;
        var controls = this.props.options.map(function(checkbox, key) {
            var checked = (_this.getValue() === checkbox.value);
            return (
                <div className="checkbox" key={key}>
                    <label>
                        <input
                            checked={checked}
                            type="checkbox"
                            value={checkbox.value}
                            onChange={_this.changeRadio}
                            disabled={_this.isFormDisabled() || checkbox.disabled}
                        /> {checkbox.label}
                    </label>
                </div>
            );
        });
        return controls;
    },

    radioControls: function() {
        var _this = this;
        var controls = this.props.options.map(function(radio, key) {
            var checked = (_this.getValue() === radio.value);
            var disabled = _this.isFormDisabled() || radio.disabled;
            var className = 'radio' + (disabled ? ' disabled' : '');
            return (
                <div className={className} key={key}>
                    <label>
                        <input
                            checked={checked}
                            type="radio"
                            value={radio.value}
                            onChange={_this.changeRadio}
                            disabled={disabled}
                        /> {radio.label}
                    </label>
                </div>
            );
        });
        return controls;
    },

    radioInlineControls: function() {
        var _this = this;
        var controls = this.props.options.map(function(radio, key) {
            var checked = (_this.getValue() === radio.value);
            return (
                <label className="radio-inline" key={key}>
                    <input
                        checked={checked}
                        type="radio"
                        value={radio.value}
                        onChange={_this.changeRadio}
                        disabled={_this.isFormDisabled() || radio.disabled}
                    /> {radio.label}
                </label>
            );
        });
        return controls;
    },

    render: function() {

        var controls = '';

        if (this.props.type === 'radio') {
            controls = this.radioControls();
        }

        if (this.props.type === 'radio-inline') {
            controls = this.radioInlineControls();
        }

        if (this.props.type === 'checkbox') {
            controls = this.checkboxControls();
        }

        if (this.props.wrap === false) {
            return (
                <div>
                    {controls}
                    {this.renderHelp()}
                    {this.renderErrorMessage()}
                </div>
            );
        }

        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.props.layout}
                fakeLabel={true}
            >
                {controls}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = RadioGroup;
