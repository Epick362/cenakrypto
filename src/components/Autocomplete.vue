<template>
    <div :class="classPrefix" @mousedown="mousefocus = true" @mouseout="mousefocus = false">
        <input type="text" @blur="focused = false" @focus="focused = true"
            v-model="search" :placeholder="placeholder" :class="inputClass"
            @keydown.down.prevent.stop="moveDown()"
            @keydown.up.prevent.stop="moveUp()"
            @keydown.enter.prevent.stop="select(selectedIndex)"
            @keydown.tab="mousefocus = false"
            ref="input"
            :required="required">
        <div v-if="showSuggestions" :class="classPrefix + '__suggestions'">
            <div v-for="(entry, index) in filteredEntries.slice(0, showLimit)"
                @click="select(index)"
                :class="[classPrefix + '__entry', selectedClass(index)]">
                <slot name="item"
                  :symbol="entry.symbol"
                  :fullName="entry.name">
                  {{ entry[property] }}
                </slot>
            </div>

            <div
              :class="[classPrefix + '__more']"
              v-if="filteredEntries.length > showLimit">
              a {{ filteredEntries.length - showLimit }} ďalších...
            </div>
        </div>
    </div>
</template>

<script>
import { autocompleteBus } from './autocompleteBus.js';

export default {
    data () {
        return {
            entries: [],
            search: '',
            focused: false,
            mousefocus: false,
            selectedIndex: 0,
            showLimit: 10
        };
    },
    computed: {
        filteredEntries () {
            if (this.search.length <= this.threshold) {
                return [];
            } else {
                return this.entries.filter((entry) => {
                    if (this.ignoreCase) {
                        return entry[this.property].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                    }
                    return entry[this.property].indexOf(this.search) > -1;
                });
            }
        },
        hasSuggestions () {
            if (this.search.length <= this.threshold) {
                return false;
            }

            return this.filteredEntries.length > 0;
        },
        showSuggestions () {
            if (!this.hasSuggestions) {
                return false;
            }

            if (this.focused || this.mousefocus) {
                return true;
            }

            return false;
        }
    },
    created () {
        this.search = this.value;
        if (this.list !== undefined) {
            this.setEntries(this.list);
        } else if (this.url !== undefined && this.requestType !== undefined) {
            this.getListAjax();
        }
    },
    methods: {
        select (index) {
            if (this.hasSuggestions) {
                this.search = this.filteredEntries[index][this.property];
                autocompleteBus.$emit('autocomplete-select', this.search);

                if (this.autoHide) {
                    this.mousefocus = false;
                    this.focused = false;
                    this.$refs.input.blur();
                } else {
                    this.$nextTick(() => {
                        this.$refs.input.focus();
                    });
                }
            }
        },
        setEntries (list) {
            this.entries = list;
        },
        moveUp () {
            if ((this.selectedIndex - 1) < 0) {
                this.selectedIndex = this.filteredEntries.length - 1;
            } else {
                this.selectedIndex -= 1;
            }
        },
        moveDown () {
            if ((this.selectedIndex + 1) > (this.filteredEntries.length - 1)) {
                this.selectedIndex = 0;
            } else {
                this.selectedIndex += 1;
            }
        },
        selectedClass (index) {
            if (index === this.selectedIndex) {
                return this.classPrefix + '__selected';
            }

            return '';
        },
        getListAjax () {
            return this.$http[this.requestType](this.url).then(response => {
                this.setEntries(response.data);
            });
        }
    },
    props: {
        classPrefix: {
            type: String,
            required: false,
            default: 'autocomplete',
        },
        url: {
            type: String,
            required: false,
        },
        requestType: {
            type: String,
            required: false,
            default: 'get',
        },
        list: {
            type: Array,
            required: false,
        },
        placeholder: {
            type: String,
            required: false,
        },
        property: {
            type: String,
            required: false,
            default: 'name',
        },
        inputClass: {
            type: String,
            required: false,
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
        },
        ignoreCase: {
            type: Boolean,
            required: false,
            default: true,
        },
        threshold: {
            type: Number,
            required: false,
            default: 0,
        },
        value: {
            required: false,
            default: '',
        },
        autoHide: {
            type: Boolean,
            required: false,
            default: true,
        }
    },
    watch: {
        filteredEntries (value) {
            if (this.selectedIndex > value.length - 1) {
                this.selectedIndex = 0;
            }
        },
        search (value) {
            this.$emit('input', value);
        },
        value (newValue) {
            this.search = newValue;
        }
    }
};
</script>

<style lang="scss" scoped>
@import './../assets/variables';

.autocomplete {
  position: relative;

  input {
    width: 100%;
    padding: 6px 16px;
    border-radius: 16px;
    border: none;
    background: rgba(255,255,255,0.2);
    color: #FFF;
    font-size: 1rem;
    width: 150px;
    transition: all 200ms ease-in;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

    &:focus {
      width: 250px;
      background: rgba(255,255,255,0.25);
    }

    &:hover {
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
    }
  }
}

.autocomplete__suggestions {
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 2;

  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
  width: auto;
  min-width: 100%;
  font-variant: initial !important;
  margin-top: 5px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  background: transparent;
}

.autocomplete__more {
  color: $palette-text;
  background: $palette-hero;
  font-size: 0.8rem;
  padding: 5px;
  cursor: default;
}

.autocomplete__entry {
  color: $palette-text;
  background: lighten($palette-hero, 5%);
  font-variant: initial !important;
  font-size: 1em !important;
  transition: all 200ms ease-in-out;
  padding: 10px;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &:hover {
    background: $palette-accent;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    z-index: 5;
  }
}

.autocomplete__selected {
  background-color: darken($palette-accent, 5%);
}
</style>