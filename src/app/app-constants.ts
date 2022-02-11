export class AppConstants {

	public static get baseServidor(): string { return "http://localhost:8080/" }

	public static get baseLogin(): string { return this.baseServidor + "controlirrigationapi/login" }

	public static get baseUrl(): string {return this.baseServidor + "controlirrigationapi/usuario/"}

	public static get baseUrlFazenda(): string {return this.baseServidor + "controlirrigationapi/fazendas/"}

	public static get baseUrlPath(): string {return this.baseServidor + "controlirrigationapi/"}

	public static get baseUrlCultura(): string {return this.baseServidor + "controlirrigationapi/culturas/"}

}
