import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';
import './api.js';

/**
 * Registers a new block type: traficom-block/traficom-data
 */
registerBlockType( 'traficom-block/traficom-data', {
	title: __( 'Traficom Data', 'traficom-block' ),
	icon: 'list-view',
	category: 'widgets',

	/**
	 * Block edit function
	 *
	 * @returns {JSX.Element} The block editor markup.
	 */
	edit() {
		return (
			<div className="traficom-block-editor">
				<p>
					{ __(
						'Tämä lohko mahdollistaa katsastusdatan hakemisen vuoden ja autonmallin perusteella.',
						'traficom-block'
					) }
				</p>
			</div>
		);
	},

	/**
	 * Block save function
	 *
	 * @returns {JSX.Element} The block frontend markup.
	 */
	save() {
		return (
		<div className="traficom-block">
			<label className="traficom-block-checked-year-label traficom-block-label traficom-block-half-label">
				{__('Katsastusvuosi:', 'traficom-block')}
				<select className="traficom-block-checked-year traficom-select2"></select>
			</label>
            <label className="traficom-block-model-label traficom-block-label traficom-block-full-label">
				{__('Automalli:', 'traficom-block')}
				<select className="traficom-block-model traficom-select2" multiple></select>
			</label>
			<table className="traficom-data-table" width="100%">
				<thead>
					<tr>
						<th>{__('Automalli', 'traficom-block')}</th>
						<th>{__('Käyttöönottovuosi', 'traficom-block')}</th>
						<th>{__('Katsastusmäärä', 'traficom-block')}</th>
						<th className="toggle">{__('KA. ajokilometrit', 'traficom-block')}</th>
						<th className="toggle">{__('Mediaani ajokilometrit', 'traficom-block')}</th>
						<th className="toggle">{__('Hylkäysprosentti', 'traficom-block')}</th>
						<th className="toggle">{__('Hyväksytty', 'traficom-block')}</th>
						<th className="toggle">{__('Hylätty', 'traficom-block')}</th>
					</tr>
				</thead>
			</table>
		</div>
		);
	},
});
