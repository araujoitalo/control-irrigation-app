export class AppConstants {

	//public static get baseServidor(): string { return "http://localhost:8080/" }

	public static get baseServidor(): string { return "https://controle-irrigacao-api.herokuapp.com/" }

	public static get baseLogin(): string { return this.baseServidor + "controlirrigationapi/login" }

	public static get baseUrl(): string {return this.baseServidor + "controlirrigationapi/usuario/"}

	public static get baseUrlFazenda(): string {return this.baseServidor + "controlirrigationapi/fazendas/"}

	public static get baseUrlPath(): string {return this.baseServidor + "controlirrigationapi/"}

	public static get baseUrlCultura(): string {return this.baseServidor + "controlirrigationapi/culturas/"}

	public static get baseUrlGotejador(): string {return this.baseServidor + "controlirrigationapi/gotejadores/"}

	public static get baseUrlOutorga(): string {return this.baseServidor + "controlirrigationapi/outorgas/"}

	public static get baseUrlClimas(): string {return this.baseServidor + "controlirrigationapi/climas/"}

	public static get baseUrlIrrigacoes(): string {return this.baseServidor + "controlirrigationapi/irrigacoes/"}

	public static get baseUrlParcelas(): string {return this.baseServidor + "controlirrigationapi/parcelas/"}

	public static get baseUrlPrecipitacoes(): string {return this.baseServidor + "controlirrigationapi/precipitacoes/"}
}
