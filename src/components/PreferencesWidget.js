// components/PreferencesWidget.js
import CheckboxGroup from './CheckboxGroup';

const PreferencesWidget = ({ preference, currentPreferences, handlePreferencesChange }) => {
  return (
    <div>
      <CheckboxGroup 
        preference={preference} 
        currentPreference={currentPreferences[preference.name]} 
        handlePreferencesChange={handlePreferencesChange} 
      />
    </div>
  );
};

export default PreferencesWidget;
